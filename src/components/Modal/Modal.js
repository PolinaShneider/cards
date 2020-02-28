import React, {Component} from 'react';
import './Modal.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import documentIcon from "../../assets/document.svg";
import DragnDrop from "../DragnDrop/DragnDrop";

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '', title: '', description: '', errors: []};
        this.cover = React.createRef();
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
        const {file, title, description} = this.state;
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
            onSave({title, description, image: file});
            this.closeModal();
        } else {
            this.setState({
                errors
            })
        }
    }

    closeModal() {
        const {closeModal} = this.props;
        this.setState({title: '', description: '', file: '', errors: []});
        if (this.cover.current) {
            this.cover.current.style.style = "";
        }
        closeModal();
    }

    deleteCover(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({file: ''});
        if (this.cover.current) {
            this.cover.current.style.style = "";
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
