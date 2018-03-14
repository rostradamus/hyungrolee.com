import React, { Component } from 'react';
import { Button, Checkbox, Form, TextArea } from 'semantic-ui-react'

class PostForm extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Contents</label>
                    <TextArea placeholder='contents' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

export default PostForm;