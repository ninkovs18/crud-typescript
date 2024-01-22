import React, { useEffect, useState, ReactElement } from "react";
import {
  SelectionMode,
  DetailsList,
  TextField,
  ComboBox,
  mergeStyles,
  IComboBox,
  IComboBoxOption,
  Stack,
  IDetailsRowStyles,
  IColumn,
  DetailsRow,
  IDetailsHeaderProps,
  DetailsHeader,
  IDetailsColumnStyles,
  ITooltipHostProps,
  IDetailsColumnRenderTooltipProps,
  DetailsColumn,
  DetailsColumnBase,
  Tooltip,
  TooltipBase,
} from "@fluentui/react";
import {
  ILabelStyles,
  ITextFieldStyles,
  IComboBoxStyles,
  IDetailsListStyles,
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
const comboBoxStyles: Partial<IComboBoxStyles> = {
  root: {
    maxWidth: "300px",
    backgroundColor: "#6741d9",
    selectors: {
      ":focus-within": {
        borderBottom: "0px",
      },
      ":hover": {
        borderBottom: "0px",
      },
      "::after": {
        border: "0px",
      },
    },
  },
  input: {
    backgroundColor: "#6741d9",
  },
  optionsContainerWrapper: {
    maxWidth: "300px",
  },
  label: {
    color: "#dee2e6",
  },
};

const DisplayData = () => {
  const [data, setData] = useState<IPerson[]>([]);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("All");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3003/persons");
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  const userTypes = data.reduce(
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
        key: "",
        text: "All",
      },
    ]
  );

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

  const filterData =
    type === "All"
      ? data.filter((d) =>
          d.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      : search
      ? data
          .filter((d) =>
            d.name.toLowerCase().includes(search.toLocaleLowerCase())
          )
          .filter((d) => d.userType === type)
      : data.filter((d) => d.userType === type);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 230,
    },
    {
      key: "column2",
      name: "Surname",
      fieldName: "surname",
      minWidth: 100,
      maxWidth: 230,
    },
    {
      key: "column3",
      name: "User type",
      fieldName: "userType",
      minWidth: 100,
      maxWidth: 230,
    },
    {
      key: "column4",
      name: "City",
      fieldName: "city",
      minWidth: 100,
      maxWidth: 230,
    },
    {
      key: "column5",
      name: "Address",
      fieldName: "address",
      minWidth: 100,
      maxWidth: 230,
    },
    {
      key: "edit",
      name: "Edit",
      fieldName: "edit",
      minWidth: 50,
      maxWidth: 70,

      onRender: (item: IPerson) => (
        <EditDialog handleEdit={handleEdit} user={item} />
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

  return (
    <Stack>
      <Stack style={{ padding: "40px" }}>
        <Stack horizontal style={{ padding: "0px 20px" }}>
          <TextField
            label="Filter by name:"
            value={search}
            styles={textFieldStyles}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setSearch(newValue || "")}
          />
          <ComboBox
            label="Filter by user type:"
            options={userTypes}
            styles={comboBoxStyles}
            allowFreeInput
            autoComplete="on"
            onChange={(
              event: React.FormEvent<IComboBox>,
              option?: IComboBoxOption,
              index?: number,
              value?: string
            ) => setType(value || "All")}
            defaultSelectedKey={""}
          />
          <Stack
            style={{
              justifyContent: "center",
              flexGrow: 2,
              alignItems: "end",
            }}
          >
            <CreateDialog data={data} handleAddPerson={handleAddPerson} />
          </Stack>
        </Stack>
        <Stack
          style={{
            overflowY: "auto",
            height: "70vh",
          }}
        >
          <DetailsList
            columns={columns}
            items={filterData}
            setKey="multiple"
            selectionMode={SelectionMode.none}
            onShouldVirtualize={() => false}
            onRenderRow={onRenderRow}
            onRenderDetailsHeader={onRenderDetailsHeader}
          />
          {!data.length && (
            <p style={{ textAlign: "center", color: "#fff" }}>
              there is no person in the list
            </p>
          )}
          {!filterData.length && (
            <p style={{ textAlign: "center", color: "#fff" }}>
              There is no result for the given search filter
            </p>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DisplayData;
