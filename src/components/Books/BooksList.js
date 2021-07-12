import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Header,
    Pagination,
    Table,
    TextFilter,
    SpaceBetween,
    CollectionPreferences
} from '@awsui/components-react'
//import { books } from './BooksDB'
import { useCollection } from '@awsui/collection-hooks';
import { getBooks, deleteBook, getBooksByAuthor } from './BooksService';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const COLUMN_DEFINITIONS = [

    {
        id: 'id',
        sortingField: 'id',
        header: 'Id',
        cell: item => (
            <div>
                <Link to={`/book/${item.id}`}>
                    {item.id}
                </Link>
            </div>
        ),
        width: 50
    },
    // {
    //     id: 'authorId',
    //     sortingField: 'authorId',
    //     header: 'Author Id',
    //     cell: item => (
    //         <div>
    //             <Link to={`/author/${item.authorId}`}>
    //                 {item.authorId}
    //             </Link>
    //         </div>
    //     ),
    //     minWidth: 50  
    // },
    {
        id: 'author',
        sortingField: 'author',
        header: 'Author',
        cell: item => (
            <div>
                <Link to={`/author/${item.authorId}`}>
                    {item.author.name}
                </Link>
            </div>
        ),
        minWidth: 160
    },
    {
        id: 'title',
        sortingField: 'title',
        header: 'Title',
        cell: item => item.title,
        minWidth: 160
    },
    {
        id: 'year',
        sortingField: 'year',
        header: 'Year',
        cell: item => item.year,
        minWidth: 80
    }


]

const MyCollectionPreferences = ({ preferences, setPreferences }) => {

    return (
        <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}

            pageSizePreference={{
                title: 'Page size',
                options: [
                    { value: 10, label: '10 Books' },
                    { value: 30, label: '30 Books' },
                    { value: 50, label: '50 Books' },
                ]

            }}
            wrapLinesPreference={{
                label: 'Wrap lines',
                description: 'Check to see all the text and wrap the lines'
            }}
            visibleContentPreference={{
                title: 'Select visible columns',
                options: [
                    {
                        label: 'Book properties',
                        options: [
                            { id: 'id', label: 'Id', editable: false },
                            //{ id: 'authorId', label: 'Author Id' },
                            { id: 'author', label: 'Author' },
                            { id: 'title', label: 'Title' },
                            { id: 'year', label: 'Year' },
                        ]

                    }

                ]

            }}

        />
    )

}


function EmptyState({ title, subtitle, action }) {

    return (
        <Box textAlign="center">


            <Box variant="strong">
                {title}
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} >
                {subtitle}
            </Box>
            {action}

        </Box>

    )

}


export default function BooksList(props) {

    const [allItems, setAllItems] = useState([]);
    const [preferences, setPreferences] = useState({ pageSize: 10, visibleContent: ['id', 'author', 'title', 'year'] })
    const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(allItems,
        {
            filtering: {
                empty: (<EmptyState

                    title="No books"
                    subtitle="No books to display."
                    action={<Button>Create book</Button>}

                />),
                noMatch: (<EmptyState

                    title="No matches"
                    subtitle="Your search didn't return any records."
                    action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>}

                />)
            },
            pagination: { pageSize: preferences.pageSize },
            sorting: {},
            selection: {}

        });

    const { selectedItems } = collectionProps;
    const history = useHistory()
    const { authorId } = useParams();

    useEffect(() => {

        if (typeof authorId === 'undefined') {
            getBooks()
                .then(items => { setAllItems(items) }
                )
        }
        else {
            getBooksByAuthor(authorId)
                .then(items => {
                    setAllItems(items)
                })
        }

    }, []

    )

    function handleDelete() {

        const confirm = window.confirm(`Are you sure you wish to delete book "${selectedItems[0].id}"?`)
        if (confirm) {

            deleteBook(selectedItems[0].id).then(() => {
                console.log('Book deleted')
                getBooks()
                    .then(items => { setAllItems(items) }
                    )
                props.addNotification([
                    {
                        type: 'success',
                        content: 'Resource deleted successfully',
                        dismissible: true,
                        onDismiss: () => props.addNotification([])
                    }
                ])
            }

            )
        }
    }

    function handleEdit() {
        history.push(`/book/${selectedItems[0].id}`)
    }

    function handleCreate() {
        history.push('/book/')
    }

    return (
        <Table
            {...collectionProps}
            header={

                <Header
                    counter={selectedItems.length ? `(${selectedItems.length}/${allItems.length})` : `(${allItems.length})`}
                    actions={
                        <SpaceBetween size="xs" direction="horizontal">
                            <Button disabled={selectedItems.length === 0} onClick={handleEdit}>Edit</Button>
                            <Button disabled={selectedItems.length === 0} onClick={handleDelete}>Delete</Button>
                            <Button variant="primary" onClick={handleCreate}>Create Book</Button>
                        </SpaceBetween>
                    }
                >
                    Books
            </Header>
            }
            filter={
                <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Find text..."
                    countText={filteredItemsCount}
                />

            }
            columnDefinitions={COLUMN_DEFINITIONS}
            visibleColumns={preferences.visibleContent}
            pagination={<Pagination {...paginationProps} />}
            preferences={<MyCollectionPreferences
                preferences={preferences}
                setPreferences={setPreferences}

            />}
            items={items}
            selectionType='single'
        />


    )

}