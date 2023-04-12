```mermaid
classDiagram
class A {
    <<service>>
    + a1
    - a2
    + fn()
}
class B {
    + int b[]
    + run():int
}
A <|-- B : inherit
```
