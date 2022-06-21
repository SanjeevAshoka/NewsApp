import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card"  >
          <div style ={ {display: 'flex', justifyContent: 'flex-end',position: 'absolute', right:'0'}}>
          <span class=" badge rounded-pill bg-danger">{source} </span></div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">Read More </a>
          </div>
        </div>
      </div>
    )
  }
}
