/**
 * Public client API helpers for Dr. Alok's evaluation portal.
 * Direct connections to the dia-evaluator worker.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dia-evaluator-backend.mail-dialabs.workers.dev";

async function publicFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let msg = `API error: ${response.status} ${response.statusText}`;
    try {
      const e = (await response.json()) as { error?: string };
      if (e.error) msg = e.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  return response.json() as Promise<T>;
}

export interface GroupPublicInfo {
  id: string;
  name: string;
  expires_at: number;
  mentor_name?: string;
}

export interface PrepareUploadResponse {
  submission_id: string;
  upload_url: string;
  upload_key: string;
  content_type: string;
  expires_in: number;
}

export interface ConfirmUploadResponse {
  queued: boolean;
  submission_id: string;
  message: string;
}

export interface SubmissionStatusResponse {
  submission_id: string;
  status: string;
  stage_label: string;
  progress_percent: number;
  rejection_reason: string | null;
  score: number | null;
  verdict: string | null;
}

/** Fetch public details of a group using its token */
export async function fetchGroupPublic(token: string): Promise<GroupPublicInfo> {
  return publicFetch<GroupPublicInfo>(`/api/v1/group/${token}`);
}

/** Prepare upload and get a presigned URL or upload proxy path */
export async function prepareUpload(body: {
  access_token: string;
  submitter_name: string;
  unique_id: string;
  submitter_email: string;
  invention_title: string;
  phone: string;
  team_member_names: string[];
  group_name: string;
  file_name: string;
  file_type: string;
  file_size_bytes: number;
  file_hash: string;
  idempotency_key: string;
}): Promise<PrepareUploadResponse> {
  return publicFetch<PrepareUploadResponse>("/api/v1/submit/prepare", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Upload the PDF file directly to the provided upload URL */
export async function uploadFile(
  uploadUrl: string,
  file: File,
  contentType: string
): Promise<void> {
  const targetUrl =
    uploadUrl.startsWith("http://") || uploadUrl.startsWith("https://")
      ? uploadUrl
      : `${API_BASE_URL}${uploadUrl}`;

  const response = await fetch(targetUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
}

/** Confirm upload completion to queue it for pipeline evaluation */
export async function confirmUpload(body: {
  submission_id: string;
  access_token: string;
}): Promise<ConfirmUploadResponse> {
  return publicFetch<ConfirmUploadResponse>("/api/v1/submit/confirm", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Retrieve the evaluation status, current phase, score, and verdict */
export async function checkSubmissionStatus(
  submissionId: string
): Promise<SubmissionStatusResponse> {
  return publicFetch<SubmissionStatusResponse>(
    `/api/v1/submit/${submissionId}/status`
  );
}
