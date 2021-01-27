import React from "react";

const Form = ({ handleKeywords, handleSearch }) => {
   return (
      <form spellCheck="false" onSubmit={handleSearch}>
         <div className="input-form">
            <input
               type="text"
               placeholder="search movie..."
               onChange={handleKeywords}
            />
            <button>Search</button>
         </div>
      </form>
   );
};

export default Form;
