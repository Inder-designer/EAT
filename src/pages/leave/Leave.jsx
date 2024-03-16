import { Add, ErrorOutline } from "@mui/icons-material";
import { Button, Modal, Table, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ApplyLeave from "../../components/applyLeave/ApplyLeave";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { TokenExpired } from "../../config/tokenDecoded";

const Leave = () => {
  const [leaves, SetLeaves] = useState([]);
  const [leaveId, SetLeaveId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = TokenExpired();

  const getLeaves = async () => {
    try {
      const res = await axios.get("/leave/get-leave", {
        headers: {
          Authorization: token,
        },
      });
      SetLeaves(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLeaves();
  }, []);

  const deleteLeave = async () => {
    try {
      const res = await axios.delete("/leave/", {
        headers: {
          Authorization: token,
        },
        data: { leaveId }, // Include the data field for the request body
      });
      setDeleteModal(false);
      getLeaves();
      console.log(res);
      toast(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" pt-[120px] pb-6">
      {loading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh_-_250px)]">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium mb-3">My Leaves</h4>
            <input type="7" />
            <button
              className="px-2 py-1 bg-blue-500 text-white rounded flex items-center"
              onClick={() => setOpenModal(true)}
            >
              <span className="mr-1">
                <Add />
              </span>
              Apply Leave
            </button>
          </div>
          <div className="mt-6 overflow-y-hidden">
            <Table>
              <Table.Head>
                <Table.HeadCell className="!max-w-[120px] !min-w-[120px]">
                  Leave Date
                </Table.HeadCell>
                <Table.HeadCell className="!max-w-[120px] !min-w-[120px]">
                  Category
                </Table.HeadCell>
                <Table.HeadCell className="!max-w-[250px] !min-w-[250px]">
                  Reason
                </Table.HeadCell>
                <Table.HeadCell className="!max-w-[144px] !min-w-[144px]">
                  Compensatory
                </Table.HeadCell>
                <Table.HeadCell className="!max-w-[120px] !min-w-[120px]">
                  Upto
                </Table.HeadCell>
                <Table.HeadCell className="">Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {leaves.length > 0 ? (
                  leaves.map((entry) =>
                    entry.leaves.map((leave, index) => (
                      // Perform your desired operation for each leave entry here
                      <Table.Row className="bg-white" key={index}>
                        <Table.Cell className="font-medium text-gray-800">
                          {leave.date}
                        </Table.Cell>
                        <Table.Cell>{leave.category}</Table.Cell>
                        <Table.Cell className="relative">
                          <Tooltip
                            content={leave.reason}
                            placement="bottom"
                            className="whitespace-normal"
                          >
                            <p className="max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis relative">
                              {leave.reason}
                            </p>
                          </Tooltip>
                        </Table.Cell>
                        <Table.Cell>
                          {leave.compensatory ? "Yes" : "No"}
                        </Table.Cell>
                        <Table.Cell>
                          {!leave.upto ? "-" : leave.upto}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <button
                              disabled
                              className={`px-2 py-1 border border-${
                                leave.status === "Pending"
                                  ? "blue-600"
                                  : leave.status === "Approved"
                                  ? "green-600"
                                  : "red-600"
                              } text-${
                                leave.status === "Pending"
                                  ? "blue-600"
                                  : leave.status === "Approved"
                                  ? "green-600"
                                  : "red-600"
                              } rounded font-semibold w-20 text-center`}
                            >
                              {leave.status}
                            </button>
                            <button
                              className={`px-2 py-1 ${
                                leave.status === "Rejected" ||
                                leave.status === "Approved"
                                  ? "bg-[#efc96f]"
                                  : "bg-[#eaa400]"
                              } text-white rounded flex items-center`}
                              onClick={() => {
                                setDeleteModal(true);
                                SetLeaveId(leave._id);
                              }}
                              disabled={
                                leave.status === "Rejected" ||
                                leave.status === "Approved"
                              }
                            >
                              Revoke
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )
                ) : (
                  // Display a message when there are no leaves
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center pt-10">
                      <p className="text-2xl font-semibold">No Leaves</p>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="z-[999]"
            size="lg"
          >
            <Modal.Header className="py-3">Apply Leave</Modal.Header>
            <Modal.Body className="pt-3">
              <ApplyLeave
                token={token}
                setOpenModal={setOpenModal}
                getLeaves={getLeaves}
              />
            </Modal.Body>
          </Modal>
          <Modal
            show={deleteModal}
            size="md"
            onClose={() => setDeleteModal(false)}
            popup
            className="z-[999]"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <ErrorOutline className="mx-auto mb-4 !h-14 !w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={() => deleteLeave()}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setDeleteModal(false);
                      SetLeaveId("");
                    }}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Leave;
