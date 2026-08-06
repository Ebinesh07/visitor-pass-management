import { useEffect, useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import historyService from "../../services/historyService";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);

      const data =
        await historyService.getAllHistory();

      setHistory(data.history || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load history."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      `
      ${item.visitor?.visitorName}
      ${item.action}
      ${item.performedBy}
      ${item.remarks}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [history, search]);

  if (loading) {
    return (
      <Loader text="Loading History..." />
    );
  }

  return (
    <>
      <ToastContainer />

      <PageHeader
        title="History"
        subtitle="Visitor Activity Timeline"
      />

      <Card className="border-0 shadow-sm">

        <Card.Body>

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search History..."
          />

          <div className="mt-4">

            {filteredHistory.length === 0 ? (

              <EmptyState
                title="No History Found"
                description="Visitor activity history will appear here."
              />

            ) : (

             <div className="table-responsive">

  <table className="table history-table align-middle mb-0">

    <thead>

      <tr>

        <th>#</th>

        <th>Visitor</th>

        <th>Action</th>

        <th>Performed By</th>

        <th>Remarks</th>

        <th>Date & Time</th>

      </tr>

    </thead>

    <tbody>

      {filteredHistory.map((item, index) => (

        <tr key={item._id}>

          <td>

            {index + 1}

          </td>

          <td>

            <div className="visitor-profile">

              <div className="visitor-avatar">

                {item.visitor?.visitorName
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div>

                <h6>

                  {item.visitor?.visitorName}

                </h6>

                <span>

                  {item.visitor?.company}

                </span>

              </div>

            </div>

          </td>

          <td>

            <span
              className={`badge bg-${
                item.action === "APPROVED"
                  ? "success"
                  : item.action === "REJECTED"
                  ? "danger"
                  : item.action === "CHECKED-IN"
                  ? "primary"
                  : item.action === "CHECKED-OUT"
                  ? "secondary"
                  : item.action === "CANCELLED"
                  ? "dark"
                  : "warning"
              }`}
            >

              {item.action}

            </span>

          </td>

          <td>

            {item.performedBy}

          </td>

          <td>

            {item.remarks || "-"}

          </td>

          <td>

            {new Date(
              item.createdAt
            ).toLocaleString()}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

            )}

          </div>

        </Card.Body>

      </Card>

    </>
  );
};

export default History;