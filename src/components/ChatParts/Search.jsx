import { useState } from "react";
import { query, collection, where, getDocs} from "firebase/firestore"
import { db } from "../../firebase-config";
import { TextField, Autocomplete, Box, Typography} from '@mui/material';


const Search = () => {
    const [userName, setUserName] = useState("");
    const [matches, setMatches] = useState([]);
    const [results, SetResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');
   

    const handleSearch2 = async (e) => {
        if (e.key === 'Enter') {
            console.log("In search 2");
          const q = query(collection(db, 'users'), where('name', '==', searchValue));
          const querySnapShot = await getDocs(q);
          const match = [];
          querySnapShot.forEach((doc) => {
            match.push({ email: doc.id, name: doc.data().name });
          });
          setMatches(match);
        }
      };



    const handleSearch = async () =>{
        console.log(userName);
        const queryRef = query(collection(db, "profiles"), where("name", "==", userName))
        try{
            let match = []
            const querySnapShot = await getDocs(queryRef);

            querySnapShot.forEach((doc) => {
                console.log(doc.id);
                match.push({email: doc.id, name: doc.data().name});
            })
            SetMatches(match);
        }catch(err){
            console.log(err);
        }

        console.log("Made it here");
        if ( matches.length > 0) {
            console.log("This is matches: " );
            matches.forEach(item => {console.log(item)});
            SetResults(true);
        }
        
        
    };

    const handleKey = (e) => {
        if (e.keyCode === 13){
            handleSearch();
        }
    };

    return(
        <>
        <h1>Search</h1>
        <Autocomplete
      freeSolo
      disableClearable
      options={matches}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Find a user"
          onKeyDown={handleSearch2}
          margin="normal"
          onChange={(e) => setSearchValue(e.target.value)}
          variant="outlined"
        />
      )}
      renderOption={(props, option) => (
        <div {...props}>{option.name}</div>
      )}
    />

        {/* <Autocomplete
        freeSolo
        disableClearable
        selectOnFocus
        autoHighlight
        options={matches}
        //renderNoOptions={() => <Typography>No user with this name</Typography>}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                key={option.id}
                {/* <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                /> 
                {option.name}
            </Box>
          )}
        renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Find a user"
          onKeyDown={handleKey}
          margin="normal"
          onChange={(e) => setUserName((e.target.value).toLowerCase())}
          variant="outlined"
        />
        )}
        />   */}
        {/* <TextField
            placeholder="Find a user"
            variant="outlined"
            fullWidth
            size="small"
            onKeyDown={handleKey}
            onChange={(e) => setUserName((e.target.value).toLowerCase())}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 20,
                backgroundColor: '#f1f1f1',
                '&.Mui-focused': {
                  backgroundColor: '#e6e6e6',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '10px 12px',
                fontSize: '1rem',
                lineHeight: 1.5,
              },
              '& .MuiInputLabel-outlined': {
                fontSize: '1rem',
                color: '#555',
              },
            }}
        />
        {ifResults ?
             <Autocomplete
             options={matches}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="Chooes a person"
                 margin="normal"
                 variant="outlined"
                 InputProps={{ ...params.InputProps, type: 'search' }}
               />
             )}
            />
            :
            <p>No Results Found</p>
        }
        <input type ="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e) => setUserName((e.target.value).toLowerCase())}/> */}
        </>
        
    );
}

export default Search;