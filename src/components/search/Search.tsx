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
    localStorage.setItem('searchQuery', query); // Always update localStorage
    this.props.onSearch(query); // Trigger onSearch even if the query is empty
  };

  render() {
    return (
      <div className="flex items-center space-x-9 max-w-md mx-auto">
        <input
          ref={this.inputRef}
          type="text"
          className="px-4 py-2 border rounded"
          placeholder="name or id"
        />
        <Button onClick={this.handleSearch}>Search</Button>
      </div>
    );
  }
}

export default Search;
