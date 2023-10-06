<div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* ... (existing code for search filters and buttons) */}
      </div>
      <div style={{ margin: "20px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableContainer component={Paper} style={{ flex: 1 }}>
            <Table style={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Attendance Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>{attendance.fname}</TableCell>
                    <TableCell>{attendance.enter_time}</TableCell>
                    <TableCell>
                      {attendance.is_present === 1 ? (
                        <CheckCircleIcon style={{ color: "green" }} />
                      ) : (
                        <CancelIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleEditAttendance(attendance.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>