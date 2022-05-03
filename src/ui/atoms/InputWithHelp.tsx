import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'

// Chakra UI Components
import { FormControl, Input, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react'
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import type { SpaceProps, LayoutProps } from '@chakra-ui/react'

export type Props<T extends FieldValues> = UseControllerProps<T> &
  SpaceProps &
  LayoutProps & {
    placeholder?: string
    isDisabled?: boolean
    information: string
  }

export const InputWithHelp = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, rules, placeholder, defaultValue, isDisabled, information } = props
  const space: SpaceProps = props
  const layout: LayoutProps = props

  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController<T>({ name, control, rules })

  return (
    <FormControl
      id={`input_${name}`}
      isInvalid={!!error}
      {...rest}
      {...space}
      defaultValue={defaultValue || control?._defaultValues[name]}
    >
      <InputGroup>
        <Input
          type="text"
          role="textbox"
          ref={ref}
          placeholder={placeholder}
          {...layout}
          isDisabled={isDisabled}
          _disabled={{ color: 'gray.400' }}
          value={rest.value}
        />
        <InputRightElement>
          <Tooltip hasArrow bg="teal.500" label={information}>
            <QuestionOutlineIcon />
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
