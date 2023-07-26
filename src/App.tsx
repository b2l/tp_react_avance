import { useEffect } from 'react'
import { Col, Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Provider } from 'react-redux'
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { ContactActivities } from './ContactActivities'
import { ContactForm } from './ContactForm'
import { ContactList } from './ContactList'
import { useIsOnline } from './hooks'
import { store } from './store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function RoutedApp() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          Component: () => {
            const navigate = useNavigate()
            useEffect(() => {
              navigate('/contacts/new')
            }, [navigate])
            return null
          },
        },
        {
          path: 'contacts?/:id',
          element: <Contacts />,
        },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}

function ErrorPage() {
  return <h1>Page not found</h1>
}

function Layout() {
  const isOnline = useIsOnline()

  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid="lg">
          <Navbar.Brand href="#home">
            CRM {!isOnline && '`offline`'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/contacts">
                Contacts
              </Nav.Link>
              <Nav.Link as={Link} to="/activities">
                Activités
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="lg">
        <Stack
          direction="horizontal"
          gap={3}
          style={{ alignItems: 'flex-start' }}
        >
          <Col xs={3}>
            <Stack gap={3}>
              <Link
                style={{ margin: 'auto', display: 'block' }}
                to="/contacts/new"
              >
                + Create contact
              </Link>
              <ContactList />
            </Stack>
          </Col>
          <Outlet />
        </Stack>
      </Container>
    </Stack>
  )
}

function Contacts() {
  const { id } = useParams()
  return (
    <>
      <Col>
        <ContactForm key={id} />
      </Col>
      <Col xs={3}>
        <h3>Activités</h3>
        <ContactActivities />
      </Col>
    </>
  )
}

export default RoutedApp
