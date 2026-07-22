# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# workflow
- For long-running shell commands (npm install, test suites, builds): start in background and poll with a short command instead of waiting directly and hitting the tool-call timeout. Confidence: 0.75
- Treat tool-call timeouts on long commands as expected behavior to route around with background+poll, not as bugs to be solved. Confidence: 0.70

