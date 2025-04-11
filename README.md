# Chatfolio

Chatfolio is an interactive portfolio website that uses a chat interface to showcase projects, skills, and personality. It combines modern web technologies with AI-powered conversational capabilities to create a unique and engaging experience for visitors.

## Features

- **Chat Interface**: Users can interact with the portfolio through a chat-based interface.
- **AI-Powered Responses**: Uses Google Generative AI (Gemini API) to provide intelligent and conversational responses.
- **Project Showcase**: Displays notable projects with clickable images that open in a modal viewer.
- **Responsive Design**: Works seamlessly across devices with a clean and modern UI.
- **Customizable**: Easily update the portfolio content and AI prompt to reflect your own work and personality.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A valid Google Generative AI API key.

### Steps

1. Clone the repository:
```bash
   git clone https://github.com/your-username/chatfolio.git
   cd chatfolio
```
2. Navigate to the server directory
```bash
  cd server
```
3. Install server dependencies:
```bash
  npm install
```
4. Add your Google Generative AI API key to the .env file in /server/:
```bash
  GOOGLE_GENERATIVE_AI_KEY=your_api_key_here
```
5. Start the server
```bash
  node server.js
```
6. Open index.html in your browser to view the portfolio.

## Usage

- **Chat Commands**:
  - Type `Show me your work` to see a showcase of projects.
  - Ask questions about the portfolio or projects to receive AI-powered responses.

## Technologies Used

### Frontend
- **HTML5**: Structure of the portfolio.
- **CSS3**: Styling and animations.
- **JavaScript**: Interactive functionality.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for handling API requests.
- **Google Generative AI (Gemini API)**: AI-powered conversational responses.

### Other Tools
- **dotenv**: For managing environment variables.
- **CORS**: To enable cross-origin requests.
- **Body-parser**: To parse incoming JSON requests.

## Customization

1. **Update AI Prompt**:
   - Modify the prompt in `server/server.js` to customize the AI's behavior and responses.

2. **Add New Projects**:
   - Add new project images to the `assets/past-work/` directory.
   - Update the `imageSources` array in `script.js` with the new image paths.

3. **Styling**:
   - Modify `style.css` to customize the look and feel of the portfolio.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: sohamofficial00@gmail.com
- **GitHub**: [github.com/sohamxyzdev](https://github.com/sohamxyzdev)
- **LinkedIn**: [linkedin.com/in/sohammitradev](https://linkedin.com/in/sohammitradev)
