@main def exec(fileName: String) = {
  importCode(fileName)
  run.securityprofile

  // secrets are analyzed by a separate tool already, so let's not create duplicates
  // run.secrets

  // Output with unique marker for extraction
  println("===FINDINGS_JSON_START===")
  println(cpg.finding.toJsonPretty)
  println("===FINDINGS_JSON_END===")
}
