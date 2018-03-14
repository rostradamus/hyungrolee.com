import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostCard extends Component {

    render() {
        const { title, time, content } = this.props.post;
        return (
            <Card>
                {/*<Image src='../assets/images/sample_img.png' />*/}
                <Card.Content>
                    <Card.Header>
                        <Link to='/'>
                        { title }
                        </Link>
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            { time }
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        { content }
                    </Card.Description>
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
