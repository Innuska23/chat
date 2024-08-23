class Message {
  constructor(id, text, sender, timestamp) {
    this.id = id;
    this.text = text;
    this.sender = sender;
    this.timestamp = timestamp;
  }
}

module.exports = Message;
