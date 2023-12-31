import React, { useEffect, useState } from "react";
import {
  SelectionMode,
  DetailsList,
  TextField,
  ComboBox,
  mergeStyleSets,
  IComboBox,
  IComboBoxOption,
  Stack,
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

const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
};

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
  },
});

const comboBoxStyles = {
  root: {
    maxWidth: 300,
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

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 50,
      maxWidth: 150,
    },
    {
      key: "column2",
      name: "Surname",
      fieldName: "surname",
      minWidth: 50,
      maxWidth: 150,
    },
    {
      key: "column3",
      name: "User type",
      fieldName: "userType",
      minWidth: 50,
      maxWidth: 150,
    },
    {
      key: "column4",
      name: "City",
      fieldName: "city",
      minWidth: 50,
      maxWidth: 150,
    },
    {
      key: "column5",
      name: "Address",
      fieldName: "address",
      minWidth: 50,
      maxWidth: 150,
    },
    {
      key: "edit",
      name: "Edit",
      fieldName: "edit",
      minWidth: 50,
      maxWidth: 150,
      onRender: (item: IPerson) => (
        <EditDialog handleEdit={handleEdit} user={item} />
      ),
    },
    {
      key: "delete",
      name: "Delete",
      fieldName: "delete",
      minWidth: 50,
      maxWidth: 150,
      onRender: (item: IPerson) => (
        <DeleteDialog handleDelete={() => handleDelete(item.id)} />
      ),
    },
  ];
  return (
    <Stack>
      <Stack className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
        <Stack horizontal>
          <TextField
            label="Filter by name:"
            value={search}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setSearch(newValue || "")}
            styles={controlStyles}
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
         <Stack style={{justifyContent: "center", flexGrow: 2, alignItems: "end"}}>
         <CreateDialog data={data} handleAddPerson={handleAddPerson} />
         </Stack>
        </Stack>
        <Stack
          style={{ overflow: "auto", height: "70vh" }}
        >
          <DetailsList
            columns={columns}
            items={filterData}
            setKey="multiple"
            selectionMode={SelectionMode.none}
            selectionPreservedOnEmptyClick={true}
          />
          {!data.length && (
            <p style={{ textAlign: "center" }}>
              there is no person in the list
            </p>
          )}
          {!filterData.length && (
            <p style={{ textAlign: "center" }}>
              There is no result for the given search filter
            </p>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DisplayData;
