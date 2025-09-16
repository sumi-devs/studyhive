import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

class Notes extends Component {
  state = {
    title: '',
    tags: '',
    textContent: '',
    file: null,
    summary: '',
    loading: false,
    error: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      this.setState({ error: 'File too large. Max 5MB allowed.' });
      return;
    }
    this.setState({ file, error: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tags, textContent, file } = this.state;
    if (!title || (!textContent && !file)) {
      this.setState({ error: 'Please provide a title and either text or a file.' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags);
    if (file) formData.append('file', file);
    if (textContent) formData.append('textContent', textContent);

    this.setState({ loading: true, error: '', summary: '' });

    try {
      const token = localStorage.getItem('token'); // auth token
      const res = await axios.post('http://localhost:5000/api/notes/summarize', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({ summary: res.data.summary, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error generating summary.', loading: false });
    }
  };

  downloadSummary = () => {
    const { summary, title } = this.state;
    if (!summary) return;
    const blob = new Blob([summary], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `${title || 'summary'}.docx`);
  };

  render() {
    const { title, tags, textContent, loading, error, summary } = this.state;

    return (
      <div className="notes-container">
        <h2>Upload Notes</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="title" 
            placeholder="Note Title" 
            value={title} 
            onChange={this.handleChange} 
            required 
          />
          <input 
            type="text" 
            name="tags" 
            placeholder="Tags (comma separated)" 
            value={tags} 
            onChange={this.handleChange} 
          />
          <textarea
            name="textContent"
            placeholder="Or paste text here..."
            value={textContent}
            onChange={this.handleChange}
            rows={6}
          />
          <input 
            type="file" 
            accept=".pdf,.txt" 
            onChange={this.handleFileChange} 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Summarizing...' : 'Generate Summary'}
          </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {summary && (
          <div className="summary-result">
            <h3>Summary:</h3>
            <p>{summary}</p>
            <button onClick={this.downloadSummary}>Download as Word</button>
          </div>
        )}
      </div>
    );
  }
}

export default Notes;
