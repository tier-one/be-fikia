{{/*
Expand the name of the chart.
*/}}
{{- define "pgpool.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "pgpool.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "pgpool.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "pgpool.labels" -}}
helm.sh/chart: {{ include "pgpool.chart" . }}
{{ include "pgpool.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "pgpool.selectorLabels" -}}
app.kubernetes.io/name: {{ include "pgpool.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "pgpool.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "pgpool.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{/*
Return the path to the cert file.
*/}}
{{- define "pgpool.tlsCert" -}}
{{- required "Certificate filename is required when TLS in enabled" .Values.tls.certFilename | printf "/opt/bitnami/pgpool/certs/%s" -}}
{{- end -}}

{{/*
Return the path to the cert key file.
*/}}
{{- define "pgpool.tlsCertKey" -}}
{{- required "Certificate Key filename is required when TLS in enabled" .Values.tls.certKeyFilename | printf "/opt/bitnami/pgpool/certs/%s" -}}
{{- end -}}

{{/*
Return the path to the CA cert file.
*/}}
{{- define "pgpool.tlsCACert" -}}
{{- printf "/opt/bitnami/pgpool/certs/%s" .Values.tls.certCAFilename -}}
{{- end -}}

{{/*
Return the proper PostgreSQL permission image name
*/}}
{{- define "pgpool.volumePermissionsImage" -}}
{{- include "common.images.image" ( dict "imageRoot" .Values.volumePermissionsImage "global" .Values.global ) -}}
{{- end -}}

{{/*
Return the PostgreSQL username
*/}}
{{- define "pgpool.postgresqlUsername" -}}
{{/*
Helm 2.11 supports the assignment of a value to a variable defined in a different scope,
but Helm 2.9 and 2.10 doesn't support it, so we need to implement this if-else logic.
Also, we can't use a single if because lazy evaluation is not an option
*/}}
{{- if .Values.global }}
    {{- if .Values.global.postgresql }}
        {{- if .Values.global.postgresql.username }}
            {{- .Values.global.postgresql.username -}}
        {{- end -}}
    {{- else -}}
        {{- .Values.pgpool.username -}}
    {{- end -}}
{{- else -}}
    {{- .Values.pgpool.username -}}
{{- end -}}
{{- end -}}

{{/*
Return the PostgreSQL database to create
*/}}
{{- define "pgpool.postgresqlDatabase" -}}
{{/*
Helm 2.11 supports the assignment of a value to a variable defined in a different scope,
but Helm 2.9 and 2.10 doesn't support it, so we need to implement this if-else logic.
Also, we can't use a single if because lazy evaluation is not an option
*/}}
{{- $postgresqlDatabase := default "fikiaadmin" .Values.pgpool.database -}}
{{- if .Values.global }}
    {{- if .Values.global.postgresql }}
        {{- if .Values.global.postgresql.database }}
            {{- default "fikiaadmin" .Values.global.postgresql.database -}}
        {{- else -}}
            {{- $postgresqlDatabase -}}
        {{- end -}}
    {{- else -}}
        {{- $postgresqlDatabase -}}
    {{- end -}}
{{- else -}}
    {{- $postgresqlDatabase -}}
{{- end -}}
{{- end -}}
