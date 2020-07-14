import React from 'react';

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
      ret += mapping[char];
    }
    return ret;
  }

  render() {
    return (
      <div>
        <h2>Translator</h2>
        <div>
          TH-EN
          <input type="radio" value="te" checked={this.state.translateTo === "te"} onChange={this.handleLanguage} />
        </div>
        <div>
          EN-TH
          <input type="radio" value="et" checked={this.state.translateTo === "et"} onChange={this.handleLanguage} />
        </div>
        <input value={this.state.input} onChange={this.handleTranslate} /><br/>
        <input ref={(textarea) => this.copyArea = textarea} style={{backgroundColor: this.state.outputBackground}} value={this.state.translated}/>
        <button onClick={this.handleVisibility}>Show</button>{document.queryCommandSupported("copy") && <button onClick={this.handleCopy}>Copy</button>}
        <h3>{this.state.copySuccess}</h3>
      </div>
    );
  }
}

export default Translator;
