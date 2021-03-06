import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import connect from "react-redux/es/connect/connect";
import {history} from "../../_helpers";
import {Link} from "react-router-dom";

class AddProposition extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.delete = this.delete.bind(this);

        var a = null;

        this.state = {
            proposition: {
                name: ''
            },
            question: {},
            propositions: [],
            idp: 0
        };
        this.validator = new SimpleReactValidator(
            {element: message => <div className="alert text-danger bg-danger-0_1 px-4 py-3" role="alert">
                    {message}
                </div>}
        );
    }

    onChange(e) {
        const { name, value } = e.target;
        const { proposition } = this.state;
        this.setState({
            proposition: {
                ...proposition,
                [name]: value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const {proposition} = this.state;

        axios.post(`/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.idquestion}`,proposition)
            .then(response => {
                setTimeout(() => window.location.reload(), 0)
                this.a = response.data
            });

        this.setState({
        })
    }

    componentDidMount(){
        axios
            .get(`/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.idquestion}`)
            .then(response => {
                this.setState({ question: response.data });
                console.log(response.data)
            })
        axios
            .get(`/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.idquestion}/propositions`)
            .then(response => {
                this.setState({ propositions: response.data });
                console.log(response.data)
            })
    }

    delete() {
        setTimeout(() => window.location.reload(), 0);
        axios
            .delete(`/quiz/${this.props.match.params.idquiz}/question/${this.props.match.params.idquestion}/proposition/${this.state.idp}`)
            .then(response => {
                this.setState({ propositions: response.data });
                console.log(response.data)
            })

    }

    render() {
        return (
            <section className="padding-y-100 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="card shadow-v2">
                                <div className="card-header border-bottom">
                                    <h4 className="mt-4">
                                        Add new proposition!
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {alert.message &&
                                    <div className={`alert ${alert.type} text-white px-4 py-3`} role="alert">
                                        {alert.message}
                                    </div>
                                    }
                                    <h4>question: {this.state.question.name}</h4>
                                    {this.state.propositions.map(p=>
                                    {return(

                                        <ol className="list-unstyled comments-area">
                                            <li>
                                                <p>
                                                        <i className="ti-trash" onClick={this.delete}/>
                                                        {p.name}
                                                </p>

                                            </li>
                                        </ol>

                                    )})}
                                    <form name="form" onSubmit={this.onSubmit}>
                                        <div className="input-group input-group--focus mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" />
                                            </div>
                                            <input name="name" type="text" className="form-control border-left-0 pl-0" placeholder="Name"
                                                   value={this.state.proposition.name}
                                                   onChange={this.onChange}
                                            />
                                            {this.validator.message('Name', this.state.proposition.name, 'required')}
                                        </div>
                                        <button type="submit" className="btn btn-block btn-primary">Add proposition</button>
                                        <div>
                                            <p>   </p>
                                        </div>
                                        <Link to={"/addquestion/"+this.props.match.params.idquiz}
                                              className="btn btn-info active mr-2 mb-3"
                                              type="submit">
                                            new question
                                        </Link>
                                        <Link to={"/showquiz/"+this.props.match.params.idquiz}
                                              className="btn btn-info active mr-2 mb-3"
                                              type="submit">
                                            show quiz
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const { authentication } = state;
    const { user } = authentication;
    const { proposition } = state;

    return {
        alert,
        user,
        authentication,
        proposition
    };
}

const connectedLoginPage = connect(mapStateToProps)(AddProposition);
export { connectedLoginPage as AddProposition };
