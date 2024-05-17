/* eslint-disable react-hooks/exhaustive-deps */
// Dashboard.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InnoLogo from "../assets/Innoscripta_logo.png";
import { Tooltip, useMediaQuery } from "@mui/material";
import {
  AppBar,
  CategorySection,
  CompanyLogo,
  DashboardContainer,
  DateContainer,
  FilterBox,
  Header,
  KbDatePicker,
  LeftContent,
  ListItem,
  NavBox,
  PersonalizedFeedButton,
  PersonalizedFeedContainer,
  RightContent,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./StyledComponents";
import SearchIcon from "@mui/icons-material/Search";
import NewsCard from "./NewsCard";
import { Button, TextField } from "@mui/material";
import { fetchNewsRequest } from "../actions/newsApi-action";
import { fetchNewsRequestNyTimes } from "../actions/nyTimesApi-action";
import { fetchNewsRequestTheGuardian } from "../actions/theGuardianApi-action";
import { resetNewsData } from "../actions/common-action";

const defaultTheme = createTheme();

const Category = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "Entertainment",
  "technology",
];

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Dashboard() {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [viewCategory, setViewCategory] = useState(true);

  const sourceList = useSelector((state) => state.sources);
  const authorList = useSelector((state) => state.authors);

  const uniqueAuthors = [...new Set(authorList)];
  const uniqueSources = [...new Set(sourceList)];

  console.log(uniqueAuthors, "uniqueAuthors");

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPersonalizedCategory, setSelectedPersonalizedCategory] =
    useState("");
  const [SelectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [personalizedFeedActive, setPersonalizedFeedActive] = useState(false);

  console.log(selectedCategory, "selectedCategory");
  console.log(selectedPersonalizedCategory, "selectedPersonalizedCategory");

  const debouncedQuery = useDebounce(keyword, 300);

  const fetcher = () => {
    dispatch(resetNewsData());
    dispatch(
      fetchNewsRequest({
        Category: personalizedFeedActive
          ? selectedPersonalizedCategory
          : selectedCategory,
        Keyword: keyword,
        Sources: SelectedSources,
        Authors: selectedAuthors,
      })
    );
    dispatch(
      fetchNewsRequestNyTimes({
        Category: personalizedFeedActive
          ? selectedPersonalizedCategory
          : selectedCategory,
        Keyword: keyword,
        Sources: SelectedSources,
        Authors: selectedAuthors,
      })
    );
    dispatch(
      fetchNewsRequestTheGuardian({
        Category: personalizedFeedActive
          ? selectedPersonalizedCategory
          : selectedCategory,
        Keyword: keyword,
        Sources: SelectedSources,
        Authors: selectedAuthors,
      })
    );
  };

  useEffect(() => {
    fetcher();
  }, [debouncedQuery]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleViewPersonalizedFeed = () => {
    setOpen(!open);
    setViewCategory(!viewCategory);
  };

  const handleCategorySelection = (clickedItem) => {
    if (clickedItem !== selectedCategory) {
      setSelectedCategory(clickedItem);
    }
  };

  const handlePersonalizedCategorySelection = (clickedItem) => {
    if (clickedItem !== selectedPersonalizedCategory) {
      setSelectedPersonalizedCategory(clickedItem);
    }
  };

  const handleSourcesSelection = (sourceItem) => {
    setSelectedSources((prevSelectedSources) => {
      if (prevSelectedSources.includes(sourceItem)) {
        return prevSelectedSources.filter((source) => source !== sourceItem);
      } else {
        return [...prevSelectedSources, sourceItem];
      }
    });
  };

  const handleAuthorsSelection = (authorItem) => {
    setSelectedAuthors((prevSelectedSources) => {
      if (prevSelectedSources.includes(authorItem)) {
        return prevSelectedSources.filter((source) => source !== authorItem);
      } else {
        return [...prevSelectedSources, authorItem];
      }
    });
  };

  const handlePersonalizedFeedSubmit = () => {
    setPersonalizedFeedActive(true);
    setSelectedCategory("");
    setKeyword("");
    setOpen(!open);
    setViewCategory(!viewCategory);
  };

  const handlePeronalizedFeedClear = () => {
    setPersonalizedFeedActive(false);
    setSelectedSources([]);
    setSelectedAuthors([]);
    setSelectedPersonalizedCategory("");
    setOpen(!open);
    setViewCategory(!viewCategory);
  };

  useEffect(() => {
    fetcher();
  }, [
    selectedCategory,
    selectedPersonalizedCategory,
    SelectedSources,
    selectedAuthors,
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <NavBox>
              <LeftContent>
                <CompanyLogo src={InnoLogo} alt="Innoscripta" />
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={keyword}
                    onChange={handleKeywordChange}
                  />
                </Search>
              </LeftContent>
              <RightContent>
                <DateContainer>
                  {/* <KbDatePicker
                    customWidth="270px"
                    className="datepicker"
                    autoOk
                    fullWidth
                    clearable
                    disableFuture
                    format="MM/dd/yyyy"
                    label="Start Date"
                    value={searchActivityStartDate}
                    onChange={startDatePickerHandler}
                    onKeyUp={startDatePickerHandler}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    invalidDateMessage=""
                    renderInput={(props) => <TextField {...props} />}
                  /> */}
                  {/* <KbDatePicker
                    customWidth="270px"
                    className="datepicker"
                    autoOk
                    fullWidth
                    clearable
                    disableFuture
                    format="MM/dd/yyyy"
                    label="End Date"
                    value={searchActivityEndDate}
                    onChange={endDatePickerHandler}
                    onKeyUp={endDatePickerHandler}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                    invalidDateMessage=""
                    renderInput={(props) => <TextField {...props} />}
                  /> */}
                </DateContainer>
              </RightContent>
            </NavBox>
          </Toolbar>
          <Header open={open}>
            {!isSmallScreen && (
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                News Aggregator
              </Typography>
            )}
            {viewCategory && (
              <CategorySection>
                {Category.map((item) => (
                  <ListItem
                    key={item}
                    onClick={() => handleCategorySelection(item)}
                    sx={{
                      backgroundColor:
                        selectedCategory === item ? "#e6e6e6" : "transparent",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#e6e6e6",
                      },
                    }}
                  >
                    {item}
                  </ListItem>
                ))}
              </CategorySection>
            )}

            {open && (
              <PersonalizedFeedContainer open={open}>
                <FilterBox>
                  <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Categories
                    </Typography>
                    <ul
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyleType: "none",
                        padding: 0,
                      }}
                    >
                      {Category.map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor:
                              selectedPersonalizedCategory === item
                                ? "#e6e6e6"
                                : "transparent",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "10px",
                            marginRight: "5px",
                            "&:hover": {
                              backgroundColor: "#e6e6e6",
                            },
                          }}
                        >
                          <li
                            onClick={() =>
                              handlePersonalizedCategorySelection(item)
                            }
                          >
                            {item}
                          </li>
                        </Box>
                      ))}
                    </ul>
                  </Box>
                  {isSmallScreen ? (
                    <Divider orientation="horizontal" />
                  ) : (
                    <Divider orientation="vertical" />
                  )}
                </FilterBox>
                <FilterBox>
                  <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Authors
                    </Typography>
                    <ul
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyleType: "none",
                        padding: 0,
                      }}
                    >
                      {uniqueAuthors.map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: selectedAuthors.includes(item)
                              ? "#e6e6e6"
                              : "transparent",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "10px",
                            marginRight: "5px",
                            "&:hover": {
                              backgroundColor: "#e6e6e6",
                            },
                          }}
                        >
                          <li onClick={() => handleAuthorsSelection(item)}>
                            {item}
                          </li>
                        </Box>
                      ))}
                    </ul>
                  </Box>
                  {isSmallScreen ? (
                    <Divider orientation="horizontal" />
                  ) : (
                    <Divider orientation="vertical" />
                  )}
                </FilterBox>
                <FilterBox>
                  <Box>
                    <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                      Source
                    </Typography>
                    <ul
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyleType: "none",
                        padding: 0,
                      }}
                    >
                      {uniqueSources.map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: SelectedSources.includes(item)
                              ? "#e6e6e6"
                              : "transparent",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "10px",
                            marginRight: "5px",
                            "&:hover": {
                              backgroundColor: "#e6e6e6",
                            },
                          }}
                        >
                          <li onClick={() => handleSourcesSelection(item)}>
                            {item}
                          </li>
                        </Box>
                      ))}
                    </ul>
                  </Box>
                </FilterBox>
              </PersonalizedFeedContainer>
            )}
            <PersonalizedFeedButton
              open={open}
              as="button"
              onClick={handleViewPersonalizedFeed}
            >
              {open ? (
                <>
                  <Button
                    onClick={handlePersonalizedFeedSubmit}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography>Submit</Typography>
                    <KeyboardArrowUpIcon />
                  </Button>
                  <Button
                    onClick={handlePeronalizedFeedClear}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography>clear</Typography>
                    <KeyboardArrowUpIcon />
                  </Button>
                </>
              ) : (
                <>
                  {isSmallScreen ? (
                    <Tooltip title="View Personalized Feed">
                      <KeyboardArrowDownIcon
                        onClick={handleViewPersonalizedFeed}
                      />
                    </Tooltip>
                  ) : (
                    <>
                      <Typography>Personalized my feed</Typography>
                      <KeyboardArrowDownIcon
                        onClick={handleViewPersonalizedFeed}
                      />
                    </>
                  )}
                </>
              )}
            </PersonalizedFeedButton>
          </Header>
        </AppBar>

        <DashboardContainer component="main">
          <Toolbar />
          <Toolbar />
          <NewsCard />
        </DashboardContainer>
      </Box>
    </ThemeProvider>
  );
}
