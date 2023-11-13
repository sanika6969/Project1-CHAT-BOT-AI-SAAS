const dotenv = require("dotenv");
dotenv.config();
const { OpenAIAPI } = require("openai");

const openai = new OpenAIAPI({ key: process.env.OPENAI_API_KEY });

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `Summarize this \n${text}`;
    const { choices } = await openai.complete.create({
      engine: "text-davinci-003",
      prompt,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (choices && choices.length > 0 && choices[0].text) {
      return res.status(200).json(choices[0].text);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

// Repeat the same pattern for other controllers...
