import Form from "@awsui/components-react/form";
import FormField from "@awsui/components-react/form-field";
import Input from "@awsui/components-react/input";
import Select from "@awsui/components-react/select";
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import { useEffect, useState } from "react";
import { createBook, getBook, updateBook } from './BooksService'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getAuthors, getAuthor  } from '../Authors/AuthorsService'

export default function BookDetails(props) {

    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [year, setYear] = useState();
    const [authorId, setAuthorId] = useState();
    const [authorOptions, setAuthorOptions] = useState()
    const [selectValue, setSelectValue] = useState();

    const history = useHistory();
    const { bookId } = useParams();

    console.log('bookId: ', bookId)


    function handleCancel() {

        history.push('/books')

    }

    function handleSubmit(event) {

        event.preventDefault()

        if (!title) {
            alert('Please provide a title for this book')
            return
        }
        if (!year) {
            alert('Please provide a year for this book')
            return
        }

        if (bookId) {

            updateBook({id, authorId, title, year}).then((json) => {
                console.log('Book updated successfully')
                console.log(json)
                props.addNotification([{
                    type: 'success',
                    content: 'Resource updated successfully',
                    dismissible: true,
                    onDismiss: () => props.addNotification([])
                }])
                history.push('/books')
            })
        } else {

            createBook({ authorId, title, year }).then((json) => {
                console.log('Book created successfully')
                console.log(json)
                props.addNotification([{
                    type: 'success',
                    content: 'Resource created successfully',
                    dismissible: true,
                    onDismiss: () => props.addNotification([])
                }])
                history.push('/books')
            })
        }

    }

    useEffect(() => {
        if (bookId) {
            getBook(bookId)
                .then(book => {
                    setId(book.id)
                    setAuthorId(book.authorId)
                    setTitle(book.title)
                    setYear(book.year)

                    getAuthor(book.authorId)
                      .then(author => {
                          setSelectValue({
                              label: author.name,
                              value: author.id
                          })
                      })

                })
        }

    }, [])

    useEffect(() => {
        getAuthors()
          .then(items => {
              setAuthorOptions(items.map(item => ({
                  label: item.name,
                  value: item.id
              })))
          })

    }, [])

    function handleSelectChange(event) {

        setSelectValue(event.detail.selectedOption)
        setAuthorId(event.detail.selectedOption.value)

    }

    return (
        <Form
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="link" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </SpaceBetween>

            }
            header={
                <Header variant="h1" description="Book details">
                    {bookId ? "Edit Book" : "Create Book"}
                </Header>
            }
        >
            <Container header={<Header variant="h2">Book</Header>}>
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="Book Id" description="Book Id">
                        <Input value={id} disabled={true} onChange={(event) => setId(event.detail.value)} />
                    </FormField>
                    <FormField label="Author Id" description="Author Id">
                        <Input value={authorId} disabled={true} onChange={(event) => setAuthorId(event.detail.value)} />
                    </FormField>
                    <FormField label="Author name">
                        <Select options={authorOptions}
                          selectedOption={selectValue}
                          onChange={(event) => handleSelectChange(event) }
                        />
                    </FormField>
                    <FormField label="Title" description="Title">
                        <Input value={title} onChange={(event) => setTitle(event.detail.value)} />
                    </FormField>
                    <FormField label="Year" description="Year">
                        <Input value={year} onChange={(event) => setYear(event.detail.value)} />
                    </FormField>
                </SpaceBetween>
            </Container>
        </Form>

    )
}