import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header/Header';
import CardsWrapper from './components/CardsWrapper/CardsWrapper';
import Modal from './components/Modal/Modal';
import {
    addCardAction,
    closeModalAction,
    confirmEditAction,
    deleteCardAction,
    editCardAction,
    openModalAction,
    toggleEditModeAction
} from './actions/cards';
import {connect} from 'react-redux';
import Pagination from './components/Pagination/Pagination';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import queryString from 'query-string';
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            postsPerPage: 9
        };

        /**
         * Instantly listen to location (search param) change - pagination click
         */
        this.props.history.listen((location) => this.paginate(location));
    }

    componentDidMount() {
        const {history} = this.props;
        /**
         * Paginate on manual search param indication or redirect if it is invalid
         */
        const paginationSuccess = this.paginate();

        if (!paginationSuccess) {
            history.push('/?page=1')
        }
    }

    render() {
        const {
            data: {cards: posts, modalIsOpen, editedItem, editingMode},
            openModal,
            closeModal,
            addCard,
            deleteCard,
            editCard,
            confirmEdit,
            toggleEditMode
        } = this.props;
        const {currentPage, postsPerPage} = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className="App">
                <DndProvider backend={Backend}>
                    <Header openModal={openModal} toggleEditMode={toggleEditMode} editingMode={editingMode}/>
                    <Route
                        path="/"
                        component={() =>
                            <CardsWrapper
                                editingMode={editingMode}
                                cards={currentPosts}
                                editCard={editCard}
                                deleteCard={deleteCard}
                            />
                        }
                    />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        current={currentPage}
                    />
                    <Modal
                        confirmEdit={confirmEdit}
                        editedItem={editedItem}
                        onSave={addCard}
                        closeModal={closeModal}
                        hidden={!modalIsOpen}
                    />
                </DndProvider>
            </div>
        );
    }

    paginate(location = this.props.location) {
        const params = queryString.parse(location.search);
        /**
         * Search param is valid, for example '?page=1', not '?page=hello'
         */
        if (params.page && !isNaN(params.page) && +params.page > 0) {
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
        deleteCard: (id) => dispatch(deleteCardAction(id)),
        editCard: (data) => dispatch(editCardAction(data)),
        confirmEdit: (data) => dispatch(confirmEditAction(data)),
        toggleEditMode: () => dispatch(toggleEditModeAction())
    }
};

App.propTypes = {
    data: PropTypes.object,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    addCard: PropTypes.func,
    deleteCard: PropTypes.func,
    editCard: PropTypes.func,
    confirmEdit: PropTypes.func,
    toggleEditMode: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)
