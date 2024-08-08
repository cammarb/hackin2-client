import { Link, useLocation, matchPath } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react/jsx-runtime'

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const routes = [
    {
      path: '/programs/:id',
      breadcrumb: 'Program Details'
    },
    {
      path: '/programs/:id/submissions/:submissionId',
      breadcrumb: 'Submission Details'
    },
    {
      path: '/programs/new',
      breadcrumb: 'Add Program'
    }
  ]

  const findBreadcrumb = (pathname: string) => {
    for (const route of routes) {
      if (matchPath(route.path, pathname)) {
        return route.breadcrumb
      }
    }
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((_value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          const breadcrumb = findBreadcrumb(routeTo)

          return (
            breadcrumb && (
              <Fragment key={routeTo}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo}>{breadcrumb}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
