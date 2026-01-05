import React from 'react';
import './Translator.css';

class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      // te = Thai to English
      // et = English to Thai
      translateTo: "te",
      translated: "",
      outputBackground: "black",
      copySuccess: "",
      et: {"0":"จ","1":"ๅ","2":"/","3":"-","4":"ภ","5":"ถ","6":"ุ","7":"ึ","8":"ค","9":"ต","-":"ข","=":"ช","\\":"ฃ","q":"ๆ","w":"ไ","e":"ำ","r":"พ","t":"ะ","y":"ั","u":"ี","i":"ร","o":"น","p":"ย","[":"บ","]":"ล","a":"ฟ","s":"ห","d":"ก","f":"ด","g":"เ","h":"้","j":"่","k":"า","l":"ส",";":"ว","'":"ง","z":"ผ","x":"ป","c":"แ","v":"อ","b":"ิ","n":"ื","m":"ท",",":"ม",".":"ใ","/":"ฝ","!":"+","@":"๑","#":"๒","$":"๓","%":"๔","^":"ู","&":"฿","*":"๕","(":"๖",")":"๗","_":"๘","+":"๙","|":"ฅ","Q":"๐","W":"\"","E":"ฎ","R":"ฑ","T":"ธ","Y":"ํ","U":"๊","I":"ณ","O":"ฯ","P":"ญ","{":"ฐ","}":",","A":"ฤ","S":"ฆ","D":"ฏ","F":"โ","G":"ฌ","H":"็","J":"๋","K":"ษ","L":"ศ",":":"ซ","\"":".","Z":"(","X":")","C":"ฉ","V":"ฮ","B":"ฺ","N":"์","M":"?","<":"ฒ",">":"ฬ","?":"ฦ"},
      te: {"ๅ":"1","/":"2","-":"3","ภ":"4","ถ":"5","ุ":"6","ึ":"7","ค":"8","ต":"9","จ":"0","ข":"-","ช":"=","ฃ":"\\","ๆ":"q","ไ":"w","ำ":"e","พ":"r","ะ":"t","ั":"y","ี":"u","ร":"i","น":"o","ย":"p","บ":"[","ล":"]","ฟ":"a","ห":"s","ก":"d","ด":"f","เ":"g","้":"h","่":"j","า":"k","ส":"l","ว":";","ง":"'","ผ":"z","ป":"x","แ":"c","อ":"v","ิ":"b","ื":"n","ท":"m","ม":",","ใ":".","ฝ":"/","+":"!","๑":"@","๒":"#","๓":"$","๔":"%","ู":"^","฿":"&","๕":"*","๖":"(","๗":")","๘":"_","๙":"+","ฅ":"|","๐":"Q","\"":"W","ฎ":"E","ฑ":"R","ธ":"T","ํ":"Y","๊":"U","ณ":"I","ฯ":"O","ญ":"P","ฐ":"{",",":"}","ฤ":"A","ฆ":"S","ฏ":"D","โ":"F","ฌ":"G","็":"H","๋":"J","ษ":"K","ศ":"L","ซ":":",".":"\"","(":"Z",")":"X","ฉ":"C","ฮ":"V","ฺ":"B","์":"N","?":"M","ฒ":"<","ฬ":">","ฦ":"?"}
    }
    this.handleLanguage = this.handleLanguage.bind(this)
    this.handleTranslate = this.handleTranslate.bind(this)
    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleCopy = this.handleCopy.bind(this)

    this.translate = this.translate.bind(this)
  }

  handleTranslate(event) {
    this.setState({input: event.target.value, translated: this.translate(event.target.value, this.state.translateTo)});
  }

  handleLanguage(event) {
    this.setState({translateTo: event.target.value, translated: this.translate(this.state.input, event.target.value)});
  }

  handleVisibility(event) {
    this.setState({outputBackground: this.state.outputBackground === "black" ? "white" : "black"});
  }

  handleCopy(event) {
    this.copyArea.select()
    document.execCommand("copy")
    this.setState({copySuccess: "Copied!"})
    setTimeout(function() {
      this.setState({copySuccess: ""})
    }.bind(this), 3000)
  }

  translate(input, lang) {
    let ret = "";
    let mapping = lang === "te" ? this.state.te : this.state.et;
    for (let char of input) {
      ret += char in mapping ? mapping[char] : "";
    }
    return ret;
  }

  render() {
    return (
      <div className="translator">
        <div className="translator__card">
          <h2 className="translator__title">Key Mapper</h2>
          <div className="translator__toggle-group">
            <label className="translator__toggle-option">
              <input type="radio" value="te" checked={this.state.translateTo === "te"} onChange={this.handleLanguage} />
              <span className="translator__toggle-label">
                <span>TH</span>
                <span className="arrow">→</span>
                <span>EN</span>
              </span>
            </label>
            <label className="translator__toggle-option">
              <input type="radio" value="et" checked={this.state.translateTo === "et"} onChange={this.handleLanguage} />
              <span className="translator__toggle-label">
                <span>EN</span>
                <span className="arrow">→</span>
                <span>TH</span>
              </span>
            </label>
          </div>
          <div className="translator__field-group">
            <span className="translator__field-label">Input</span>
            <textarea className="translator__textarea" value={this.state.input} onChange={this.handleTranslate} placeholder="Type or paste text here..." />
          </div>
          <div className="translator__field-group">
            <span className="translator__field-label">Output</span>
            <textarea ref={(textarea) => this.copyArea = textarea} className="translator__textarea translator__textarea--output" style={{backgroundColor: this.state.outputBackground}} value={this.state.translated} readOnly />
          </div>
          <div className="translator__actions">
            <button className="translator__button" onClick={this.handleVisibility}>
              <span className="translator__button-icon">{this.state.outputBackground === "black" ? "👁" : "👁‍🗨"}</span>
              {this.state.outputBackground === "black" ? "Show" : "Hide"}
            </button>
            {document.queryCommandSupported("copy") && <button className="translator__button translator__button--primary" onClick={this.handleCopy}>
              <span className="translator__button-icon">📋</span>
              Copy
            </button>}
          </div>
          <div className={`translator__copy-success ${this.state.copySuccess ? 'translator__copy-success--visible' : ''}`}>
            {this.state.copySuccess || '\u00A0'}
          </div>
        </div>
      </div>
    );
  }
}

export default Translator;
