import { Component, createElement } from "react";
import React from 'react';
import "./ui/SignatureWeb.css";
import { Helmet } from "react-helmet";



export class Button extends React.Component {
    debugger;
    constructor(props) {
        super(props);
        this.onClickHandler = this.handleOnChange.bind(this);
        this.state = { disabled: false };
    }
    handleOnChange(event) {
        debugger;
        if (this.props.id == "Restore") {
            // Disable the Restore button when required
            this.setState({
                disabled: event.target.value
            })
        }
    }


    render() {
        return (
            <div>
                <input type="button" id={this.props.id} value={this.props.value} disabled={this.state.disabled} style={btnStyle}
                    onChange={(event) => this.handleOnChange(event)}
                    onClick={this.props.funcName} />
            </div>
        );
    }
}
export class FirstName extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "John" };
    }
    handleOnChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }
    render() {
        return (
            <div>
                First name: <input type="text" id="fname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.firstName} />
            </div>
        );
    }
}

export class LastName extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lastName: "Smith" };
    }
    handleOnChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }
    render() {
        return (
            <div>
                Last name: <input type="text" id="lname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.lastName} />
            </div>
        );
    }
}


export class TextSignature extends React.Component {
    debugger;
    constructor(props) {
        super(props);
        this.state = { txtSignature: "" };
    }
    handleOnChange(event) {
        debugger;
        this.setState({
            txtSignature: event.target.value
        })
    }
    render() {
        return (
            <textarea cols="125" rows="15" value={this.state.txtSignature} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle}></textarea>
        );
    }
}

export class UserMsgs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: ""
        };
        this.textLog = React.createRef();
    }


    componentDidUpdate() {
        debugger;
        if (this.state.userMessage != '') {
            var SignaturePad = this.state.userMessage.split('>')[1]
            if (SignaturePad) {
                SignaturePad = SignaturePad.substring(0, SignaturePad.length - 1);
                this.props.props.SignatureImage?.setValue(SignaturePad);

            }
 
        }
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight; // Auto-scrolls to the bottom
    }

    handleOnChange(event) {
        this.setState({
            userMessage: event.target.value
        })
    }

    render() {
        return (
            <textarea ref={this.textLog} cols="125" rows="15" value={this.state.userMessage} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle} />
        );
    }
}

export class ImageBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: "",
            height: 135,
            width: 230
        };
    }
    handleOnChange(event) {
        this.setState({
            imageSrc: event.target.value
        })
        console.log("imageSrc changed");
    }
    render() {
        return (
            <div>
                <img id="imageBox" className="boxed boxStyle" src={this.state.imageSrc} onChange={(event) => this.handleOnChange(event)} />
            </div>
        );
    }
}


export class ChkBoxB64 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: true }
    }
    handleOnChange(event) {
        this.setState({
            checked: true
        })
    }
    render() {
        return (
            <div>
                <input type="checkbox" id="chkUseB64Image" onChange={(event) => this.handleOnChange(event)} />Use base-64 signature image
            </div>
        );
    }
}

export class ChkBoxSigText extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: false }
    }
    handleChange = () => {
        this.state.checked = !this.state.checked;
        window.enableRestoreButton(); // Enable or disable the Restore button
    }

    render() {
        return (
            <div>
                <input type="checkbox" id="chkShowSigText"
                    checked={this.props.checked}
                    onChange={(event) => this.handleChange(event)}
                />Output SigText to form
            </div>
        );
    }
}

export class SignatureWeb extends Component {
    constructor(props) {
        super(props);


    }
    SaveCaptureSignature() {
        var ImageBase64Signature = document.getElementById("imageBox").src;
        if (ImageBase64Signature.includes('data')) {
            ImageBase64Signature = ImageBase64Signature.split(',')[1]
            debugger;
            if (this.props.onSaveAction && this.props.onSaveAction.canExecute) {
                this.props.SignatureImage.setValue(ImageBase64Signature);
                this.props.onSaveAction.execute();
            }

        } else {
            if (this.props.onSaveAction && this.props.onSaveAction.canExecute) {
                this.props.SignatureImage.setValue("");
                this.props.onSaveAction.execute();
            }
        }

    }
    componentDidMount() {
        document.getElementById("imageBox").src = "./img/MyFirstModule$Images$SignaturePen.png";
    }


    render() {


        return (
            <div className="container">

                <Helmet>

                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="description" content="Web site created using create-react-app" />
                    {/* 
<link rel="manifest" href="./manifest.json" /> */}

                    <script src="./wgssSigCaptX.js"></script>
                    <script src="./base64.js"></script>
                    <script src="./SigCaptX-Globals.js"></script>
                    <script src="./SigCaptX-Utils.js"></script>
                    <script src="./SigCaptX-SessionControl.js"></script>
                    <script src="./SigCaptX-Functions.js"></script>


                </Helmet>

                <div className="row RowHeader header">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                        <img src="./img/MyFirstModule$Images$IraqLogo.png" />
                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6">

                        <h2 style={{
                            color: "white",
                            position: "relative",
                            top: "35%",
                        }} >التوقيع الالكتروني</h2>
                    </div>
                </div>

                <div className="row" style={{ alignItems: 'center', top: '100px', position: 'relative' }}>
                    <div className="col-xs-3 col-sm-3 col-md-3">

                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5">
                        <ImageBox ref={ImageBox => { window.ImageBox = ImageBox }} />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3">
                        <div style={{ display: 'grid' }}>
                            <button disabled={this.props.EnableButtonSignature.value == 'true' ? true : false} value="Capture" style={{ width: "164px", height: "60px", color: "white", backgroundColor: "#1f3646", fontSize: "20px", borderRadius: "12px" }} onClick={() => {
                                bodyOnLoad()
                                setTimeout(() => {
                                    capture();
                                }, 1000);
                            }} title="Starts signature capture" >توقيـع / أعادة توقيـع</button>
                            {/* funcName={window.capture}  */}
                            <br />
                            <button disabled={this.props.EnableButtonSave.value == 'true' ? true : false} value="Save" style={{ width: "164px", height: "60px", color: "white", backgroundColor: "#1f3646", fontSize: "20px", borderRadius: "12px" }} onClick={() => this.SaveCaptureSignature()} title="Starts signature capture" >حفــظ</button>

                        </div>

                    </div>
                    <table>
                        <tbody>

                            <tr style={{ display: 'none' }} >
                                <td>
                                    <Button value="Clear" funcName={window.clearSignature} title="Clears the signature" />
                                </td>
                                <td>
                                    <Button value="License Info" funcName={window.aboutBox} title="Displays the Help About box" />
                                </td>
                            </tr>
                            <tr style={{ display: 'none' }}>
                                <td>
                                    <Button value="Restore" id="Restore" funcName={window.setSignatureText} title="Restores the signature from the SigText data. To use this function please tick <Output SigText to form>" ref={Button => { window.Button = Button }} />
                                </td>
                                <td>
                                    <Button value="Signature Details" funcName={window.displaySignatureDetails} title="Displays capture details of the signature" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ display: 'none' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Data included in the hash:</b>
                                </td>
                                <td>
                                    <FirstName ref={FirstName => { window.FirstName = FirstName }} />
                                </td>
                                <td>
                                    <LastName ref={LastName => { window.LastName = LastName }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{ display: 'none' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Options:</b>
                                </td>
                                <td>
                                    <ChkBoxB64 ref={ChkBoxB64 => { window.ChkBoxB64 = ChkBoxB64 }} />
                                </td>
                                <td>
                                    <ChkBoxSigText ref={ChkBoxSigText => { window.ChkBoxSigText = ChkBoxSigText }} />
                                </td>
                            </tr>
                        </tbody>
                        <UserMsgs props={this.props} ref={UserMsgs => { window.UserMsgs = UserMsgs }} style={{ display: 'none' }} />
                        <br />&nbsp;&nbsp;&nbsp;SigText:<br />
                        <TextSignature id="txtSignature" ref={TextSignature => { window.TextSignature = TextSignature }} style={{ display: 'none' }} />

                    </table>


                </div>




            </div>


        );
    }

}


const textStyle = {
    marginLeft: "15px",
};

const textBoxStyle = {
    marginLeft: "15px",
    padding: "10px 10px",
    textAlign: "left"
}

const btnStyle = {
    height: "10mm",
    width: "35mm",
};

const boxStyle = {
    height: "35mm",
    width: "60mm",
    border: "1px solid #d3d3d3",

};