import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal.js';
import Aux from '../Aux';
// import axios from '../../axios-orders.js'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        

        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(r => {
                this.setState({error: null})
                return r
            })
            this.respInterceptor = axios.interceptors.response.use(null, err => {
                this.setState({error: err})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.respInterceptor)
        }
        
        closeErrorModalHandler = () => {
            this.setState({error: null})
        }

        render() {
            console.log("inwrapper")
            return (
                <Aux>
                    <Modal show={this.state.error} close={this.closeErrorModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} error={this.state.error} />
                </Aux>
            );
        }
    }
}
export default withErrorHandler;
