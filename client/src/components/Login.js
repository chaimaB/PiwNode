import React, {Component} from 'react';
import { Link} from "react-router-dom";
import {userActions} from "../_actions/user.actions";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import FacebookLogin from 'react-facebook-login';
import { history } from '../_helpers';
import Webcam from "react-webcam";
import Modal from "react-responsive-modal";



class Login extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmitcam = this.onSubmitcam.bind(this);
    }

    onOpenModal = () => {
        this.setState({open: true});
        setTimeout(()=>{

        },3000)
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    onSubmitcam() {
        const { dispatch } = this.props;


    }
    responseFacebook = (response) => {
        const { dispatch } = this.props;
        dispatch(userActions.loginFacebook(response.id))
        //console.log(response);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (this.validator.allValid()) {
            dispatch(userActions.login(username, password));
           // history.push('/profil')

        }else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        }
    }
    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const {dispatch} = this.props
        const imageSrc = this.webcam.getScreenshot();
        const formData = new FormData();
        formData.append('image', imageSrc);
        dispatch(userActions.loginCam(formData))

    };
    render() {
        const { username, password } = this.state;
        const {alert} = this.props;
        const { loggingIn } = this.props;


        return (
            <section className="padding-y-100 bg-light">
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div style={{width: 700}}>
                        <div className="modal-header">
                            <h5 className="modal-title">Facial recognition login</h5>

                        </div>
                        <Webcam
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                        />
                        <div className="modal-footer py-4">
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.onCloseModal}>Close</button>
                            <button type="button" type="submit" className="btn btn-success" onClick={this.capture}>Sign in</button>
                        </div>
                    </div>
                </Modal>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Log In to Your Professor Robot Account!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col my-2">
                                            <FacebookLogin
                                                appId="426024058143152"
                                                autoLoad={false}
                                                fields="name,email,picture,birthday"
                                                callback={this.responseFacebook}
                                                cssClass="btn btn-block btn-facebook"
                                                icon="fa-facebook"
                                            />

                                        </div>
                                        <div className="col my-2">
                                            <button className="btn btn-block btn-google-plus">
                                                <i className="ti-google mr-1"/>
                                                <span>Google Sign in</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-block btn-primary" onClick={this.onOpenModal}>
                                        <i className="ti-eye mr-2"/>
                                        <span>facial recognition Sign in</span>
                                    </button>
                                    <p className="text-center my-4">
                                        OR
                                    </p>
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <form name="form" onSubmit={this.handleSubmit} className="px-lg-4">
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-email"/>
                                            </div>
                                            <input type="text" className="form-control border-left-0 pl-0"
                                                   placeholder="Username" name="username" value={username} onChange={this.handleChange}/>

                                        </div>
                                        {this.validator.message('username', username, 'required')}

                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white ti-lock"/>
                                            </div>
                                            <input type="password" className="form-control border-left-0 pl-0"
                                                   placeholder="Password"  name="password" value={password} onChange={this.handleChange}/>

                                        </div>
                                        {this.validator.message('password', password, 'required')}

                                        <div className="d-md-flex justify-content-between my-4">
                                            <label className="ec-checkbox check-sm my-2 clearfix">
                                                <input type="checkbox" name="checkbox"/>
                                                <span className="ec-checkbox__control"/>
                                                <span className="ec-checkbox__lebel">Remember Me</span>
                                            </label>
                                            <Link to="/forgot" className="text-primary my-2 d-block">Forgot
                                                password?</Link>
                                        </div>
                                        <button className="btn btn-block btn-primary">Log In</button>
                                        {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <p className="my-5 text-center">
                                            Don’t have an account? <Link to="/signup"
                                                                         className="text-primary">Register</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }


}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const {alert} = state;

    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };
