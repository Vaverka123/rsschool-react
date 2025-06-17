import { Component, createRef } from 'react';
import Button from '../button/Button';

interface SearchProps {
  onSearch: (query: string) => void;
}

class Search extends Component<SearchProps> {
  private inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery && this.inputRef.current) {
      this.inputRef.current.value = savedQuery;
    }
  }

  handleSearch = () => {
    const query = this.inputRef.current?.value.trim() || '';
    localStorage.setItem('searchQuery', query);
    this.props.onSearch(query);
  };

  render() {
    return (
      <div className="flex items-center space-x-9 max-w-md mx-auto">
        <input
          ref={this.inputRef}
          type="text"
          className="px-4 py-2 border rounded"
          placeholder="enter name"
        />
        <Button onClick={this.handleSearch}>Search</Button>
      </div>
    );
  }
}

export default Search;
