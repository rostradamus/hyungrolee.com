import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostCard extends Component {

    render() {
        const { title, time, content } = this.props.post;
        return (
            <Card color='grey'>
                {/*<Image src='../assets/images/sample_img.png' />*/}
                <Card.Content>
                    <Card.Header as={ Link } to='/' content={title} />
                    <Card.Meta content={time} />
                    <Card.Description content={content} />
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />
                    22 Friends
                </Card.Content>
            </Card>
        );
    }
}

export default PostCard;
