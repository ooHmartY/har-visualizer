import React from 'react';
import FileLoader from '../FileLoader';
import renderer from 'react-test-renderer';

describe('FileLoader', () => {
    it('renders initial state correctly', () => {
        const component = renderer.create(<FileLoader/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
