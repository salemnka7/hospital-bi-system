﻿using System;
using System.Collections.Generic;

namespace Hospital.API.Models;

public partial class LeaveRequest
{
    public int LeaveId { get; set; }

    public int? EmployeeId { get; set; }

    public string? LeaveType { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public string? Reason { get; set; }

    public string? Status { get; set; }

    public DateTime? RequestedAt { get; set; }

    public virtual Employee? Employee { get; set; }
}
