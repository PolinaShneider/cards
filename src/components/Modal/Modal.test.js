import React from 'react';
import {shallow} from 'enzyme';
import Modal from './Modal';

describe('Modal tests', () => {
    it('Open modal has no "hidden" attribute', () => {
        const wrapper = shallow(<Modal hidden={false}/>);
        expect(wrapper.prop('hidden')).toEqual(false)
    });

    it('Errors appear if we add card with no data', () => {
        const wrapper = shallow(<Modal hidden={false}/>);
        const event = Object.assign(jest.fn(), {
            preventDefault: () => {
                //
            }
        });
        wrapper.find('button').at(0).simulate('click', event);
        expect(wrapper.state('errors')).toEqual(['Image is empty or invalid', 'Title is empty', 'Description is empty'])
    });

    it('All fields are filled - no errors', () => {
        const wrapper = shallow(<Modal hidden={false} onSave={jest.fn()} closeModal={jest.fn()}/>);
        // Imagine it's Base64 Image
        wrapper.setState({file: 'data:image/jpeg;base64,/9j/', title: 'Hello', description: 'SEMrush'});
        const event = Object.assign(jest.fn(), {
            preventDefault: () => {}
        });
        wrapper.find('button').at(0).simulate('click', event);
        expect(wrapper.state('errors')).toEqual([])
    });

    it('Clears modal fields on close', () => {
        const wrapper = shallow(<Modal hidden={false} closeModal={jest.fn()}/>);
        wrapper.setState({file: 'data:image/jpeg;base64,/9j/', title: 'Hello', description: 'SEMrush'});
        wrapper.find('.Modal-close').at(0).simulate('click');
        expect(wrapper.state('errors')).toEqual([]);
        expect(wrapper.state('file')).toEqual('');
        expect(wrapper.state('title')).toEqual('');
        expect(wrapper.state('description')).toEqual('')
    });
});
