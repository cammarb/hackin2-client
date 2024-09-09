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

  const index = pathnames.findIndex((path) => path.startsWith(root))
  const filteredPathnames = pathnames.slice(index)
  const nonFilteredPathnames = pathnames.slice(0, index)

  const rootCapitalized = capitalizeFirstLetter(root)

  const isUUID = (str: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      str
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredPathnames.map((pathname, index) => {
          const firstItem = 0
          const lastItem = filteredPathnames.length - 1
          const isRoot = pathname === root
          const isUUIDPath = isUUID(pathname)

          return (
            <Fragment key={pathname}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={
                      index === firstItem
                        ? `/${nonFilteredPathnames.join('/')}/${root}`
                        : `/${nonFilteredPathnames.join('/')}/${filteredPathnames.slice(0, index + 1).join('/')}`
                    }
                  >
                    {isRoot
                      ? rootCapitalized
                      : isUUIDPath
                        ? 'Details'
                        : pathname}
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
