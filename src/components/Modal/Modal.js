import React, {Component} from 'react';
import './Modal.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import documentIcon from '../../assets/document.svg';
import DragnDrop from '../DragnDrop/DragnDrop';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', title: '', description: '', bigCover: false, errors: []};
        this.cover = React.createRef();
        this.checkbox = React.createRef();
    }

    render() {
        const {hidden} = this.props;
        const {file, errors} = this.state;
        return (
            <div className="Modal-overlay" hidden={hidden}>
                <form className="Modal" autoComplete="off">
                    <FontAwesomeIcon className="Modal-close" onClick={() => this.closeModal()} icon={faTimes}/>
                    <h1>Add new</h1>
                    <label htmlFor="cover" className="Modal-file" ref={this.cover}>
                        <DragnDrop onDrop={(files) => this.showPreview(files)}/>
                        {
                            !file && (
                                <div className="Modal-file-empty">
                                    <img src={documentIcon} alt="Upload an image"/>
                                    select an image file to upload or drag it here
                                </div>
                            )
                        }
                        {
                            file && (
                                <span className="Modal-file-delete">
                                    <FontAwesomeIcon onClick={(e) => this.deleteCover(e)} icon={faTrash}/>
                                </span>
                            )
                        }
                        <input
                            id="cover"
                            type="file"
                            accept="image/*"
                            onChange={(e) => this.showPreview(e.target.files)}
                        />
                    </label>
                    <div className="input-group">
                        <label>Title</label>
                        <input
                            value={this.state.title}
                            name="title"
                            placeholder="Enter title"
                            type="text"
                            onChange={(e) => this.handleInput(e)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            value={this.state.description}
                            name="description"
                            placeholder="Enter description"
                            onChange={(e) => this.handleInput(e)}
                        />
                    </div>
                    <div className="checkbox-group">
                        <label>Is big</label>
                        <input
                            type="checkbox"
                            name="bigCover"
                            ref={this.checkbox}
                            checked={this.state.checked}
                            onChange={(e) => this.setState(
                                {bigCover: e.target.checked}
                            )}
                        />
                    </div>
                    {errors.length > 0 && (
                        <div className="alert-danger">{errors[0]}</div>
                    )}
                    <button onClick={(e) => this.addCard(e)}>
                        Save
                    </button>
                </form>
            </div>
        );
    }

    handleInput(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    addCard(e) {
        e.preventDefault();
        const {onSave} = this.props;
        const {file, title, description, bigCover} = this.state;
        const errors = [];

        if (!file) {
            errors.push('Image is empty or invalid');
        }

        if (!title) {
            errors.push('Title is empty');
        }

        if (!description) {
            errors.push('Description is empty');
        }

        if (!errors.length) {
            onSave({title, description, image: file, bigCover});
            this.closeModal();
        } else {
            this.setState({
                errors
            })
        }
    }

    closeModal() {
        const {closeModal} = this.props;
        this.setState({title: '', description: '', file: '', errors: [], bigCover: false});
        if (this.cover.current) {
            this.cover.current.style = '';
        }
        if (this.checkbox.current) {
            this.checkbox.current.checked = false;
        }
        closeModal();
    }

    deleteCover(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({file: ''});
        if (this.cover.current) {
            this.cover.current.style = '';
        }
    }

    showPreview(files) {
        const reader = new FileReader();
        if (reader) {
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                const url = e.target.result;

                if (this.cover.current) {
                    this.cover.current.style.background = `url(${url}) 0 30% / cover no-repeat transparent`;
                }

                this.setState({
                    file: url
                });
            };
        }
    }
}

Modal.propTypes = {
    hidden: PropTypes.bool,
    onSave: PropTypes.func,
    closeModal: PropTypes.func
};

export default Modal;
