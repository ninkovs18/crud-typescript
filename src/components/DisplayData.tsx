import React, { useEffect, useState } from "react";
import "../App.css";
import {
  SelectionMode,
  Spinner,
  DetailsList,
  TextField,
  Stack,
  DetailsRow,
  DetailsHeader,
  Dropdown,
  Icon,
  memoizeFunction,
  DefaultButton,
  IButtonStyles,
  Checkbox,
  CheckboxVisibility,
} from "@fluentui/react";
import {
  IColumn,
  IDetailsHeaderProps,
  ISpinnerStyles,
  IDropdownProps,
  IDropdownOption,
  IDropdownStyles,
  ILabelStyles,
  ITextFieldStyles,
  IRenderFunction,
  IDetailsRowProps,
} from "@fluentui/react";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import apiRequest from "../apiRequest";
import CreateDialog from "./CreateDialog";

type Person = {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
};

type UserType = {
  text: string;
  key: string;
};

type Direction = "ASC" | "DESC";

type SortDirection = {
  direction: Direction;
  name: string;
};

const labelStyles: Partial<ILabelStyles> = {
  root: {
    color: "#dee2e6",
  },
};

const textFieldStyles: Partial<ITextFieldStyles> = {
  subComponentStyles: {
    label: labelStyles,
  },
  root: {
    minWidth: "200px",
    maxWidth: "300px",
  },
  fieldGroup: {
    border: "0px",
    borderBottom: "2px solid #6741d9",
    selectors: {
      ":focus-within": {
        borderBottom: "2px solid #6741d9",
      },
      ":hover": {
        borderBottom: "2px solid #6741d9",
      },
      "::after": {
        border: "0px",
      },
    },
  },
  field: {
    color: "#dee2e6",
    backgroundColor: "#2b3035",
  },
};
const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    minWidth: "200px",
    maxWidth: "300px",
    backgroundColor: "#2b3035",
  },
  dropdownItemHeader: {
    color: "#dee2e6",
  },
  label: {
    color: "#dee2e6",
  },
  title: {
    backgroundColor: "#2b3035",
    border: 0,
    selectors: {
      ":after": { border: "0px" },
    },
  },
  dropdown: {
    borderBottom: "2px solid #6741d9",
    selectors: {
      "::after": {
        border: "0",
      },
    },
  },
  dropdownItem: {
    backgroundColor: "#2b3035",
    color: "#dee2e6",
    selectors: {
      ":hover": {
        backgroundColor: "#6741d9",
        color: "white",
      },
    },
  },
  dropdownItemSelected: {
    backgroundColor: "#343a40",
    color: "#dee2e6",
    selectors: {
      ":hover": {
        backgroundColor: "#6741d9",
        color: "white",
      },
    },
  },
};

const spinnerStyle: ISpinnerStyles = {
  circle: {
    height: 100,
    width: 100,
    borderWidth: 4,
    borderColor: "#6741d9 rgb(199, 224, 244) rgb(199, 224, 244)",
  },
};

const DisplayData = () => {
  const [data, setData] = useState<Person[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sortColumn, setSortColumn] = useState<keyof Person>("name");
  const [sortDirection, setSortDirection] = useState<Direction>("ASC");
  const [isLoading, setIsLoading] = useState(false);
  const [finalData, setFinalData] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:3003/persons");
      const data = await response.json();
      console.log(data);
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  useEffect(() => {
    setSelectedPerson(null);
  }, [finalData]);

  const handleAddPerson = async (newPerson: Person) => {
    setData((data) => [...data, newPerson]);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    };

    const result = await apiRequest(
      "http://localhost:3003/persons",
      postOptions
    );

    console.log(result);
  };

  const handleDelete = async (id: number) => {
    setData((data) => data.filter((d) => d.id !== id));

    const result = await apiRequest(`http://localhost:3003/persons/${id}`, {
      method: "DELETE",
    });
  };

  const handleEdit = async (editUser: Person) => {
    setData((data) => data.map((d) => (d.id === editUser.id ? editUser : d)));

    const editOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    };

    const result = await apiRequest(
      `http://localhost:3003/persons/${editUser.id}`,
      editOptions
    );
  };

  const userTypes = memoizeFunction((data: Person[]): UserType[] =>
    data.reduce(
      (arr, type) => {
        if (!arr.map((el) => el.text).includes(type.userType))
          return [
            ...arr,
            { text: type.userType, key: type.userType.toLowerCase() },
          ];
        else return arr;
      },
      [
        {
          text: "All",
          key: "",
        },
      ]
    )
  );

  // const onChangeSelect = (ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked:boolean | undefined, item: Person) =>{
  //   if(!selectedPerson){
  //     setSelectedPerson(item);
  //   }else{
  //     if(selectedPerson.id === item.id){
  //       setSelectedPerson(null);
  //     }else{
  //       setSelectedPerson(item);
  //     }
  //   }
  // }

  // onChange={(ev, checked) => onChangeSelect(ev, checked, item)}
  const columns: IColumn[] = [
    {
      key: "select",
      name: "Select",
      minWidth: 50,
      maxWidth: 70,

      onRender: (item: Person) => (
        <Checkbox
          checked={item === selectedPerson}
          styles={{
            checkbox: {
              border: 0,
              backgroundColor: "#6741d9",
              selectors: { ":hover": { backgroundColor: "#6741d9" } },
            },
            checkmark: {
              color: "#fff",
              selectors: { ":hover": { backgroundColor: "#6741d9" } },
            },
          }}
        />
      ),
    },
    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "surname",
      name: "Surname",
      fieldName: "surname",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "userType",
      name: "User type",
      fieldName: "userType",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "city",
      name: "City",
      fieldName: "city",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "address",
      name: "Address",
      fieldName: "address",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const columnNames = columns
    .map((column) => {
      return {
        text: column.name,
        key: column.key,
      };
    })
    .filter((column) => column.text !== "Select");

  const filteredData = memoizeFunction(
    (data: Person[], type: string, search: string): Person[] => {
      if (type !== "All" && search !== "") {
        return data.filter((person) => {
          return (
            person.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
            person.userType === type
          );
        });
      } else if (type === "All" && search !== "") {
        return data.filter((person) =>
          person.name.toLowerCase().includes(search.toLocaleLowerCase())
        );
      } else if (type !== "All" && search === "") {
        return data.filter((person) => person.userType === type);
      }
      return data;
    }
  );

  const sortedData = (
    data: Person[],
    sortColumn: keyof Person,
    sortDirection: Direction
  ): Person[] => {
    return [...data].sort((a, b) => {
      if (sortColumn) {
        const aSort = a[sortColumn];
        const bSort = b[sortColumn];

        switch (sortDirection) {
          case "ASC":
            return aSort > bSort ? 1 : -1;
          case "DESC":
            return bSort > aSort ? 1 : -1;
        }
      }
      return 0;
    });
  };

  const onClickRow = (item: Person) => {
    if (!selectedPerson) {
      setSelectedPerson(item);
    } else {
      if (selectedPerson.id === item.id) {
        setSelectedPerson(null);
      } else {
        setSelectedPerson(item);
      }
    }
  };

  const onRenderRow: IRenderFunction<IDetailsRowProps> = (props) => {
    if (props) {
      return (
        <div onClick={() => onClickRow(props.item)}>
          <DetailsRow
            {...props}
            styles={
              props.item === selectedPerson
                ? {
                    root: {
                      backgroundColor: "#212529",
                      cursor: "pointer",
                      color: "#dee2e6",
                      fontSize: "14px",
                      borderBottom: "1px solid #343a40",
                      selectors: {
                        ":hover": {
                          background: "#212529",
                          color: "#dee2e6",
                        },
                      },
                    },
                  }
                : {
                    root: {
                      backgroundColor: "#2b3035",
                      cursor: "pointer",
                      color: "#dee2e6",
                      fontSize: "14px",
                      borderBottom: "1px solid #343a40",
                      selectors: {
                        ":hover": {
                          background: "#212529",
                          color: "#dee2e6",
                        },
                      },
                    },
                  }
            }
          />
        </div>
      );
    }

    return null;
  };

  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
    props
  ) => {
    if (props) {
      return (
        <div>
          <DetailsHeader
            {...props}
            styles={{
              root: {
                backgroundColor: "#343a40",
                color: "#fff",
                borderBottom: "1px solid #343a40",
                selectors: {
                  ":hover": {
                    background: "#212529",
                    color: "#fff",
                  },
                  ".ms-DetailsHeader-cell": {},
                  ".ms-DetailsHeader-cellTitle": {
                    color: "#fff",
                    selectors: {
                      ":hover": { background: "#212529" },
                    },
                  },
                },
              },
            }}
          />
        </div>
      );
    }

    return null;
  };

  const onRenderTitle: IRenderFunction<IDropdownOption[]> = (options) => {
    if (options) {
      const option = options[0];
      return <span style={{ color: "#fff" }}>{option?.text}</span>;
    }
    return null;
  };

  const onRenderCaretDown: IRenderFunction<IDropdownProps> = (props) => {
    if (props) {
      return (
        <span style={{ color: "#6741d9", fontSize: "18px" }}>
          <Icon iconName="ChevronDown" />
        </span>
      );
    }
    return null;
  };

  const onRenderPlaceholder: IRenderFunction<IDropdownProps> = (props) => {
    if (props) {
      return (
        <div style={{ color: "#fff" }}>
          <span>{props.placeholder}</span>
        </div>
      );
    }
    return null;
  };

  const onChangeType = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    setType(option?.text || "All");
  };
  const onChangeSort = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    setSortColumn((option?.key as keyof Person) || "");
  };

  const directionOptions: Array<SortDirection> = [
    { direction: "ASC", name: "A-Z" },
    { direction: "DESC", name: "Z-A" },
  ];

  const onChangeSortDirection = (_: any, option?: IDropdownOption) => {
    if (!option) return;
    setSortDirection(option.key as Direction);
  };
  const filterButton: IButtonStyles = {
    root: {
      backgroundColor: "#7950f2",
      color: "#fff",
      padding: "16px 30px",
      border: "0px",
      marginRight: "20px",
      borderRadius: "0.75rem",
      width: "100px",
    },
    rootHovered: {
      backgroundColor: "#6741d9",
      color: "#fff",
    },
    rootPressed: {
      backgroundColor: "#7950f2",
      color: "#fff",
    },
  };

  const handleFilter = () => {
    setFinalData(filteredData(data, type, search));
  };
  const handleSort = () => {
    setFinalData(sortedData(finalData, sortColumn, sortDirection));
  };

  return (
    <Stack>
      <Stack tokens={{ padding: 40 }}>
        <Stack
          tokens={{ childrenGap: 20 }}
          styles={{ root: { marginBottom: "20px" } }}
        >
          <Stack horizontal tokens={{ childrenGap: 40 }}>
            <TextField
              label="Filter by name:"
              value={search}
              styles={textFieldStyles}
              onChange={(
                _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newValue?: string
              ) => setSearch(newValue || "")}
            />
            <Dropdown
              placeholder="Select an option"
              label="Filter by user type:"
              options={userTypes(data)}
              styles={dropdownStyles}
              onChange={onChangeType}
              onRenderTitle={onRenderTitle}
              onRenderCaretDown={onRenderCaretDown}
              onRenderPlaceholder={onRenderPlaceholder}
            />
            <Stack grow={1} horizontalAlign="start" verticalAlign="end">
              <DefaultButton
                text="Filter"
                styles={filterButton}
                iconProps={{ iconName: "filter" }}
                onClick={handleFilter}
              ></DefaultButton>
            </Stack>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 40 }}>
            <Dropdown
              placeholder="Select an option"
              label="Sort data by:"
              options={columnNames}
              styles={dropdownStyles}
              onChange={onChangeSort}
              onRenderTitle={onRenderTitle}
              onRenderCaretDown={onRenderCaretDown}
              onRenderPlaceholder={onRenderPlaceholder}
            />
            <Dropdown
              placeholder="Select an option"
              label="Sort direction:"
              options={directionOptions.map((x) => ({
                key: x.direction,
                text: x.name,
              }))}
              selectedKey={sortDirection}
              onChange={onChangeSortDirection}
              styles={dropdownStyles}
              onRenderTitle={onRenderTitle}
              onRenderCaretDown={onRenderCaretDown}
              onRenderPlaceholder={onRenderPlaceholder}
            />
            <Stack grow={1} horizontalAlign="start" verticalAlign="end">
              <DefaultButton
                text="Sort"
                styles={filterButton}
                iconProps={{ iconName: "sort" }}
                onClick={handleSort}
              ></DefaultButton>
            </Stack>
            <Stack
              style={{
                justifyContent: "center",
                flexGrow: 2,
                alignItems: "end",
              }}
            >
              <Stack
                horizontal
                tokens={{ childrenGap: 5 }}
                styles={{ root: { marginRight: 20 } }}
              >
                {selectedPerson && (
                  <DeleteDialog
                    handleDelete={() => handleDelete(selectedPerson.id)}
                    setSelectedPerson={setSelectedPerson}
                  />
                )}
                {selectedPerson && (
                  <EditDialog
                    handleEdit={handleEdit}
                    user={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                    userTypes={userTypes(data)}
                  />
                )}
                <CreateDialog
                  data={data}
                  handleAddPerson={handleAddPerson}
                  userTypes={userTypes(data)}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{
            overflowY: "scroll",
            height: "65vh",
          }}
        >
          {isLoading && (
            <Stack grow={1} horizontalAlign="center" verticalAlign="center">
              <Spinner styles={spinnerStyle} />
            </Stack>
          )}
          {!isLoading && (
            <DetailsList
              columns={columns}
              items={finalData}
              setKey="multiple"
              checkboxVisibility={CheckboxVisibility.always}
              selectionMode={SelectionMode.none}
              onShouldVirtualize={() => false}
              onRenderRow={onRenderRow}
              onRenderDetailsHeader={onRenderDetailsHeader}
            />
          )}
          {!isLoading && !data.length && (
            <p
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "25px",
                marginTop: "20px",
              }}
            >
              <img
                src="/nodata.svg"
                alt="nodata"
                style={{
                  width: "30vh",
                  height: "30vh",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              There is no person in the list!
            </p>
          )}
          {!isLoading && !finalData.length && (
            <p
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "25px",
                marginTop: "20px",
              }}
            >
              <img
                src="/nodata.svg"
                alt="nodata"
                style={{
                  width: "30vh",
                  height: "30vh",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              There is no result for the given search filter
            </p>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DisplayData;
