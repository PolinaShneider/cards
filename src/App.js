import React, {Component} from 'react';
import {Header} from "./components/Header/Header";
import CardsWrapper from "./components/CardsWrapper/CardsWrapper";
import {Modal} from "./components/Modal/Modal";
import {addCardAction, closeModalAction, deleteCardAction, openModalAction} from "./actions/cards";
import {connect} from "react-redux";
import {Pagination} from "./components/Pagination/Pagination";
import {compose} from "redux";
import {withRouter, useLocation} from "react-router-dom";
import {Route} from "react-router-dom";
import queryString from 'query-string';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            postsPerPage: 9
        };

        this.props.history.listen((location, action) => this.paginate(location));
    }

    componentDidMount() {
        const paginationSuccess = this.paginate();

        if (!paginationSuccess) {
            this.props.history.push('/?page=1')
        }
    }

    render() {
        const {data: {cards: posts, modalIsOpen}, openModal, closeModal, addCard, deleteCard} = this.props;
        const {currentPage, postsPerPage} = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className="App">
                <Header openModal={openModal}/>
                <Route path="/" component={() => <CardsWrapper cards={currentPosts} deleteCard={deleteCard}/>}/>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    current={currentPage}
                />
                <Modal onSave={addCard} closeModal={closeModal} hidden={!modalIsOpen}/>
            </div>
        );
    }

    paginate(location = this.props.location) {
        const params = queryString.parse(location.search);
        if (params.page && !isNaN(params.page)) {
            this.setState({
                currentPage: +params.page
            });

            return true;
        }

        return false;
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(openModalAction()),
        closeModal: () => dispatch(closeModalAction()),
        addCard: (data) => dispatch(addCardAction(data)),
        deleteCard: (id) => dispatch(deleteCardAction(id))
    }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)
