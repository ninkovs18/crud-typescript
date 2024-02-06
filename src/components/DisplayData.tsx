import React, { useEffect, useState } from "react";
import "../App.css";
import {
  SelectionMode,
  Spinner,
  DetailsList,
  TextField,
  Stack,
  IColumn,
  DetailsRow,
  IDetailsHeaderProps,
  DetailsHeader,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  ISpinnerStyles,
  IDropdownProps,
  Icon,
  memoizeFunction,
} from "@fluentui/react";
import {
  ILabelStyles,
  ITextFieldStyles,
  IRenderFunction,
  IDetailsRowProps,
} from "@fluentui/react";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import apiRequest from "../apiRequest";
import CreateDialog from "./CreateDialog";

interface IPerson {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
}

interface IUserType {
  text: string;
  key: string;
}

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
    margin: "0 30px 20px 0",
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
    fontSize: "17px",
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
  const [data, setData] = useState<IPerson[]>([]);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("All");
  const [sort, setSort] = useState<keyof IPerson>("name");
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const handleAddPerson = async (newPerson: IPerson) => {
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

    console.log(result);
  };

  const handleEdit = async (editUser: IPerson) => {
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
    console.log(result);
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Surname",
      fieldName: "surname",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "column3",
      name: "User type",
      fieldName: "userType",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "column4",
      name: "City",
      fieldName: "city",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "column5",
      name: "Address",
      fieldName: "address",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      key: "edit",
      name: "Edit",
      fieldName: "edit",
      minWidth: 50,
      maxWidth: 70,

      onRender: (item: IPerson) => (
        <EditDialog handleEdit={handleEdit} user={item} userTypes={userTypes} />
      ),
    },
    {
      key: "delete",
      name: "Delete",
      fieldName: "delete",
      minWidth: 50,
      maxWidth: 70,

      onRender: (item: IPerson) => (
        <DeleteDialog handleDelete={() => handleDelete(item.id)} />
      ),
    },
  ];

  const userTypes: IUserType[] = data.reduce(
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
  );

  const columnNames = columns.map((column) => {
    return {
      text: column.name,
      key: column.name.toLocaleLowerCase()
    }
  }).filter((column) => column.text !== "Delete" && column.text !== "Edit")



const filteredData = memoizeFunction((data: IPerson[], type: string, search: string): IPerson[] => {
  if (type !== 'All' && search !== "") {
    return data.filter(person => {
      return person.name.toLowerCase().includes(search.toLocaleLowerCase()) && person.userType === type
    })
  }else if(type === "All" && search !== ""){
    return data.filter((person) => person.name.toLowerCase().includes(search.toLocaleLowerCase()))
  }else if(type !== "All" && search === ""){
    return data.filter((person) => person.userType === type)
  }
  return data;
}) 

  const sortedData = (data: IPerson[], sort : keyof IPerson) : IPerson[] => {
    return [...data].sort((a, b) => {
      if(sort){
        const aSort = a[sort]
        const bSort = b[sort];

        if(typeof aSort=== typeof bSort){
          if (aSort < bSort) {
            return -1;
          }
          if (aSort > bSort) {
            return 1;
          }
          return 0;
        }else{
          return 0;
        }
      }
      return 0;
    })
  }


  const onRenderRow: IRenderFunction<IDetailsRowProps> = (props) => {
    if (props) {
      return (
        <div>
          <DetailsRow
            {...props}
            styles={{
              root: {
                backgroundColor: "#2b3035",
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
            }}
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
    setSort(option?.text.toLocaleLowerCase() as keyof IPerson || "")
  }
  return (
    <Stack>
      <Stack tokens={{padding: 40}}>
        <Stack horizontal tokens={{childrenGap: 20}}>
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
            options={userTypes}
            styles={dropdownStyles}
            onChange={onChangeType}
            onRenderTitle={onRenderTitle}
            onRenderCaretDown={onRenderCaretDown}
            onRenderPlaceholder={onRenderPlaceholder}
          />
          <Dropdown 
          placeholder="Select an option"
          label="Sort data:"
          options={columnNames}
          styles={dropdownStyles}
          onChange={onChangeSort}
          onRenderTitle={onRenderTitle}
            onRenderCaretDown={onRenderCaretDown}
            onRenderPlaceholder={onRenderPlaceholder}
          />
          <Stack
            style={{
              justifyContent: "center",
              flexGrow: 2,
              alignItems: "end",
            }}
          >
            <CreateDialog
              data={data}
              handleAddPerson={handleAddPerson}
              userTypes={userTypes}
            />
          </Stack>
        </Stack>
        <Stack
          style={{
            overflowY: "scroll",
            height: "65vh",
          }}
        >
          {isLoading && (
            <Stack
            grow={1}
            horizontalAlign="center"
            verticalAlign="center"
            >
              <Spinner styles={spinnerStyle} />
            </Stack>
          )}
          {!isLoading && (
            <DetailsList
              columns={columns}
              items={sortedData(filteredData(data, type, search), sort)}
              setKey="multiple"
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
              there is no person in the list
            </p>
          )}
          {!isLoading && !filteredData(data, type, search).length && (
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
