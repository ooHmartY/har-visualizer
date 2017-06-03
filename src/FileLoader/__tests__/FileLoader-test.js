import React from 'react';
import renderer from 'react-test-renderer';
import FileLoader from '../index';

describe('FileLoader', () => {
    it('renders initial state correctly', () => {
        const component = renderer.create(<FileLoader />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
