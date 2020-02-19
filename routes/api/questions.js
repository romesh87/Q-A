const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Question = require('../../models/Question');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/questions
// @desc    Post question
// @access  Private
router.post(
  '/',
  [auth, check('text', 'Text is required').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newQuestion = new Question({
        user: req.userId,
        text: req.body.text
      });
      await newQuestion.save();

      // Attach user info
      const user = await User.findById(req.userId);
      newQuestion.user = user;

      res.status(201).json(newQuestion);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/questions
// @desc    Get questions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ date: 'desc' })
      .populate('user', '-password');
    res.json(questions);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/questions/:id
// @desc    Get question by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', '-password')
      .populate('answers.user', '-password');

    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    res.json(question);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    res.status(500).send('Server error');
  }
});

// @route   DELETE api/questions/:id
// @desc    Delete question
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    if (question.user.toString() !== req.userId) {
      return res.status(403).json({
        errors: [{ msg: 'Questions can only be removed by the author' }]
      });
    }

    await question.remove();
    res.json('Question removed');
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    res.status(500).send('Server error');
  }
});

// @route   POST api/questions/:id/answer
// @desc    Answer question
// @access  Private
router.post(
  '/:id/answer',
  [auth, check('text', 'Text is required').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const question = await Question.findById(req.params.id);
      if (!question) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Question not found' }] });
      }

      // Check if user tries to answer his own question
      if (question.user.toString() === req.userId) {
        return res.status(403).json({
          errors: [{ msg: 'Users cannot answer their own questions' }]
        });
      }

      // Check if question has already been answered by this user
      if (
        question.answers.filter(ans => ans.user.toString() === req.userId)
          .length > 0
      ) {
        return res.status(403).json({
          errors: [{ msg: 'Question has already been answered by this user' }]
        });
      }

      question.answers.unshift({ user: req.userId, text: req.body.text });
      await question.save();

      // Attach user info
      const user = await User.findById(req.userId);
      question.answers[0].user = user;

      res.status(201).json(question.answers);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Question not found' }] });
      }
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/questions/:id/answer
// @desc    Delete answer
// @access  Private
router.delete('/:id/answer', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    // Check if question has already been answered by this user
    if (
      question.answers.filter(ans => ans.user.toString() === req.userId)
        .length === 0
    ) {
      return res.status(403).json({
        errors: [{ msg: 'Question has not yet been answered by this user' }]
      });
    }

    // Get remove index
    const removeIndex = question.answers
      .map(ans => ans.user.toString())
      .indexOf(req.userId);

    if (question.answers[removeIndex].user.toString() !== req.userId) {
      return res.status(403).json({
        errors: [{ msg: 'Answers can only be removed by the author' }]
      });
    }

    question.answers.splice(removeIndex, 1);
    await question.save();

    res.status(200).json(question.answers);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Question not found' }] });
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/questions/:quest_id/answer/:ans_id/upvote
// @desc    Upvote answer
// @access  Private
router.put('/:quest_id/answer/:ans_id/upvote', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.quest_id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    // Get answer index
    const answerIndex = question.answers
      .map(ans => ans.id.toString())
      .indexOf(req.params.ans_id);

    if (answerIndex === -1) {
      return res.status(404).json({ errors: [{ msg: 'Answer not found' }] });
    }

    // Check if user tries to upvote his own answer

    if (question.answers[answerIndex].user.toString() === req.userId) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Users cannot upvote their own answers' }] });
    }

    // Check if user already upvoted this answer
    if (
      question.answers[answerIndex].upvotes.filter(
        upvote => upvote.user.toString() === req.userId
      ).length > 0
    ) {
      return res.status(403).json({
        errors: [{ msg: 'Answer has already been upvoted by this user' }]
      });
    }

    question.answers[answerIndex].upvotes.unshift({ user: req.userId });

    await question.save();

    res.status(200).json(question.answers[answerIndex].upvotes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Bad URL params' }] });
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/questions/:quest_id/answer/:ans_id/downvote
// @desc    Downvote answer
// @access  Private
router.put('/:quest_id/answer/:ans_id/downvote', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.quest_id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    // Get answer index
    const answerIndex = question.answers
      .map(ans => ans.id.toString())
      .indexOf(req.params.ans_id);

    if (answerIndex === -1) {
      return res.status(404).json({ errors: [{ msg: 'Answer not found' }] });
    }

    // Check if user tries to downvote his own answer

    if (question.answers[answerIndex].user.toString() === req.userId) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Users cannot downvote their own answers' }] });
    }

    // Check if user already downvoted this answer
    if (
      question.answers[answerIndex].upvotes.filter(
        upvote => upvote.user.toString() === req.userId
      ).length === 0
    ) {
      return res.status(403).json({
        errors: [{ msg: 'Answer has already been downvoted by this user' }]
      });
    }

    // Get remove index
    const removeIndex = question.answers[answerIndex].upvotes
      .map(upvote => upvote.user.toString())
      .indexOf(req.userId);

    question.answers[answerIndex].upvotes.splice(removeIndex, 1);

    await question.save();

    res.status(200).json(question.answers[answerIndex].upvotes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Bad URL params' }] });
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/questions/:quest_id/answer/:ans_id/favourite
// @desc    Mark answer as favourite
// @access  Private
router.put('/:quest_id/answer/:ans_id/favourite', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.quest_id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    // Check user
    if (question.user.toString() !== req.userId) {
      return res.status(403).json({
        errors: [{ msg: 'Only question author can choose favourite answer' }]
      });
    }

    // Get answer index
    const answerIndex = question.answers
      .map(ans => ans.id.toString())
      .indexOf(req.params.ans_id);

    if (answerIndex === -1) {
      return res.status(404).json({ errors: [{ msg: 'Answer not found' }] });
    }

    // Check if any of the answers has already been marked as favourite
    if (question.answers.filter(ans => ans.isFavourite).length > 0) {
      return res.status(403).json({
        errors: [{ msg: 'Favourite answer has already been chosen' }]
      });
    }

    question.answers[answerIndex].isFavourite = true;

    await question.save();

    res.status(200).json(question.answers[answerIndex].isFavourite);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Bad URL params' }] });
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/questions/:quest_id/answer/:ans_id/unfavourite
// @desc    Unmark answer as favourite
// @access  Private
router.put('/:quest_id/answer/:ans_id/unfavourite', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.quest_id);
    if (!question) {
      return res.status(404).json({ errors: [{ msg: 'Question not found' }] });
    }

    // Check user
    if (question.user.toString() !== req.userId) {
      return res.status(403).json({
        errors: [{ msg: 'Only question author can unvavourite answer' }]
      });
    }

    // Get answer index
    const answerIndex = question.answers
      .map(ans => ans.id.toString())
      .indexOf(req.params.ans_id);

    if (answerIndex === -1) {
      return res.status(404).json({ errors: [{ msg: 'Answer not found' }] });
    }

    // Check if no answers has been marked as favourite
    if (question.answers.filter(ans => ans.isFavourite).length === 0) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Answer has already been unfavourited' }] });
    }

    question.answers[answerIndex].isFavourite = false;

    await question.save();

    res.status(200).json(question.answers[answerIndex].isFavourite);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Bad URL params' }] });
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
