import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"
// import { rhythm } from "../utils/typography"

const SearchPreview = ({ hit }) => {
  return (
    <div>
      <h3
      // style={{
      //   marginBottom: rhythm(1 / 4),
      // }}
      >
        {/* <Link style={{ boxShadow: `none` }} to='#'> */}
        <Highlight hit={hit} attribute="title" tagName="mark" />
        {/* </Link> */}
      </h3>
      <p>

        <Highlight hit={hit} attribute="description" tagName="description" />


      </p>
      <p>
        <Highlight hit={hit} attribute="html" tagName="html" />
      </p>
    </div>
  )
}

export default SearchPreview