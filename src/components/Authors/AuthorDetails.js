import Form from "@awsui/components-react/form";
import FormField from "@awsui/components-react/form-field";
import Input from "@awsui/components-react/input";
import Select from "@awsui/components-react/select";
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import { useEffect, useState } from "react";
import { createAuthor, getAuthor, updateAuthor } from './AuthorsService'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function AuthorDetails(props) {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [country, setCountry] = useState();
    const history = useHistory();
    const { authorId } = useParams();

    console.log('authorId: ', authorId)


    function handleCancel() {

        history.push('/authors')

    }

    function handleSubmit(event) {

        event.preventDefault()

        if (!name) {
            alert('Please provide a name for this author')
            return
        }
        if (!country) {
            alert('Please provide a country for this author')
            return
        }

        if (authorId) {

            updateAuthor({id, name, country}).then((json) => {
                console.log('Author updated successfully')
                console.log(json)
                props.addNotification([{
                    type: 'success',
                    content: 'Resource updated successfully',
                    dismissible: true,
                    onDismiss: () => props.addNotification([])
                }])
                history.push('/authors')
            })
        } else {

            createAuthor({ name, country }).then((json) => {
                console.log('Author created successfully')
                console.log(json)
                props.addNotification([{
                    type: 'success',
                    content: 'Resource created successfully',
                    dismissible: true,
                    onDismiss: () => props.addNotification([])
                }])
                history.push('/authors')
            })
        }

    }

    useEffect(() => {
        if (authorId) {
            getAuthor(authorId)
                .then(author => {
                    setId(author.id)
                    setName(author.name)
                    setCountry(author.country)

                })
        }

    }, [])

    return (
        <Form
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="link" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </SpaceBetween>

            }
            header={
                <Header variant="h1" description="Author details">
                    {authorId ? "Edit Author" : "Create Author"}
                </Header>
            }
        >
            <Container header={<Header variant="h2">Author</Header>}>
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="Author Id" description="Author Id">
                        <Input value={id} disabled={true} onChange={(event) => setId(event.detail.value)} />
                    </FormField>
                    <FormField label="Name" description="Name">
                        <Input value={name} onChange={(event) => setName(event.detail.value)} />
                    </FormField>
                    <FormField label="Country" description="Country">
                        <Input value={country} onChange={(event) => setCountry(event.detail.value)} />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Form>

    )
}