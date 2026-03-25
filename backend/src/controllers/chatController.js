const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `You are CropHealth AI, an expert agricultural assistant specializing in:
- Crop disease diagnosis and treatment
- Pest identification and management
- Soil health and fertilization
- Weather impact on crops
- Sustainable farming practices
- Post-harvest handling
- Market tips for smallholder farmers

You respond in a helpful, clear, and practical manner. When users describe symptoms or upload images, you provide:
1. Possible diagnoses
2. Immediate action steps
3. Treatment recommendations (organic and conventional)
4. Prevention tips

Always be encouraging and empathetic to farmers facing challenges.`;

const knowledgeBase = {
  'late blight': 'Late blight (Phytophthora infestans) causes dark, water-soaked spots on leaves and brown rot on tubers. Treat with Mancozeb or Chlorothalonil fungicide. Remove and destroy infected plants. Ensure good drainage.',
  'powdery mildew': 'Powdery mildew appears as white powder on leaves. Use sulfur-based fungicide or neem oil spray. Improve air circulation between plants. Avoid overhead watering.',
  'leaf spot': 'Leaf spot diseases show brown/black spots with yellow halos. Apply copper-based fungicide. Remove infected leaves. Rotate crops next season.',
  'rust': 'Rust shows orange or rust-colored pustules on leaves. Apply triazole fungicide early. Improve drainage. Use resistant varieties.',
  'aphids': 'Aphids are small sap-sucking insects. Spray with neem oil or insecticidal soap. Introduce beneficial insects like ladybugs. Use sticky traps.',
  'fertilizer': 'For balanced crop nutrition: apply NPK 17-17-17 at planting. Top-dress with nitrogen (urea) at vegetative stage. Add potassium during fruiting.',
  'drought': 'During drought: mulch heavily to retain soil moisture. Water deeply but infrequently. Consider drip irrigation. Choose drought-resistant varieties.',
};

const getOfflineResponse = (message) => {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) {
      return response;
    }
  }
  return `I understand you're asking about "${message}". As a crop health advisor, I recommend:
1. Observe your crops carefully for symptoms like spots, wilting, discoloration, or pest damage
2. Take clear photos of affected areas and use our Disease Detection feature for AI analysis
3. Check local weather conditions and adjust irrigation accordingly
4. Consult with a nearby agro-vet through our Locations feature for hands-on assistance
5. Practice crop rotation to reduce disease pressure

Feel free to describe your specific crop problem in more detail and I'll provide targeted advice!`;
};

exports.chat = async (req, res) => {
  try {
    const { messages, language = 'en' } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    const languageInstruction = language !== 'en'
      ? `\n\nIMPORTANT: Respond in the user's language. Language code: ${language}. Common languages: rw=Kinyarwanda, fr=Français, sw=Kiswahili, es=Español, ar=Arabic, hi=Hindi, pt=Português, zh=Chinese.`
      : '';

    if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('your_') || OPENAI_API_KEY === 'undefined') {
      const lastMessage = messages[messages.length - 1];
      const offlineReply = getOfflineResponse(lastMessage.content || '');
      return res.json({
        success: true,
        message: offlineReply,
        source: 'knowledge-base',
      });
    }

    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT + languageInstruction },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ];

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: openaiMessages,
        max_tokens: 800,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ success: true, message: reply, source: 'openai' });
  } catch (error) {
    console.error('Chat error:', error.response?.data || error.message);
    const lastMessage = req.body.messages?.[req.body.messages.length - 1];
    const fallback = getOfflineResponse(lastMessage?.content || '');
    res.json({ success: true, message: fallback, source: 'fallback' });
  }
};
