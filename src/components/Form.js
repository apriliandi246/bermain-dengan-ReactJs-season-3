import React from 'react';


class Form extends React.Component {
   render() {
      const { handleSubmit, handleKeywords } = this.props;

      return (
         <form spellCheck="false" onSubmit={handleSubmit}>
            <div className="input-form">
               <input type="text" placeholder="search movie..." autoFocus onChange={handleKeywords} />
               <button>Search</button>
            </div>
         </form>
      );
   }
}


export default Form;