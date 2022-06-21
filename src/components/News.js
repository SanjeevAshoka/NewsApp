import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string, // pts
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
   capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],  loading: true,   page: 1,   totalResults: 0, };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Top News`;
  }
  async newsUpdate() {
    const url = `https://newsapi.org/v2/top-headlines?country =${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json(data);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    console.log("componentDidMount");
    this.newsUpdate();
  }
  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.newsUpdate();
  // };

  // handleNextClick = async () => {
  //   if (
  //     !(
  //       Math.ceil(this.state.totalResults / this.props.pageSize) <
  //       this.state.page + 1
  //     )
  //   ) {
  //     this.setState({ page: this.state.page + 1 });
  //     this.newsUpdate();
  //   }
  // };
  fetchMoreData = async () => {
      this.setState({page: this.state.page+1})
      this.newsUpdate();
  };
  render() {  console.log("render");
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          { ` News - ${this.capitalizeFirstLetter(this.props.category)}`}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        > 
        <div className="container">
        <div className='row'>
          {                                                                           //!this.state.loading &&  -> as now we will concenate the extra upcoming data/ & previous one will be already there.
            this.state.articles.map((item) => {
              return (
                <div className="col-md-4  " key={item.url}>
                  <NewsItem
                    title={item.title ? item.title.slice(0, 45) : ""}
                    description={ item.description ? item.description.slice(0, 88) : ""  }
                    imageUrl={item.urlToImage}
                    newsUrl={item.url}
                    publishedAt={item.publishedAt}
                    author={item.author}
                    source={item.source.name}
                  />
                </div>
              );
            })}
        </div></div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark mx-3"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3"
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
