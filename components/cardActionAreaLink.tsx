/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiCardActionArea, { CardActionAreaProps, CardActionAreaTypeMap } from '@material-ui/core/cardactionarea';

interface NextComposedProps {
  as: any
  href: any
  prefetch: boolean
}

const NextComposed = React.forwardRef<NextComposedProps>(function NextComposed<NextComposedProps>(props:any, ref:any) {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});


// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function CardActionAreaLink(props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />;
  }

  return (
    <MuiCardActionArea component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
  );
}

CardActionAreaLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

export default React.forwardRef<any, any>((props, ref) => <CardActionAreaLink {...props} innerRef={ref} />);