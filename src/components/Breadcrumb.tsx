import { Link, useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import { Fragment } from 'react/jsx-runtime'

const Breadcrumbs = ({ root }: { root: string }) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const rootCapilalized = capitalizeFirstLetter(root)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((pathname, index) => {
          const firstItem = 0
          const lastItem = pathnames.length - 1
          return (
            <Fragment key={pathname}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={
                      index === firstItem ? `/${root}` : `/${root}/${pathname}`
                    }
                  >
                    {pathname === root ? rootCapilalized : pathname}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index === lastItem ? <></> : <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
